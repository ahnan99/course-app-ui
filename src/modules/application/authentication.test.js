/* Integration checks use the real store, sagas and Axios config merging.
 * The adapter is replaced so no network requests are made. */
describe('authentication flow', () => {
    let store, axios, actions, pending, runSaga, handleAuthenticationErrors
    const flush = () => new Promise(resolve => setTimeout(resolve, 0))
    const application = () => store.getState().application

    beforeEach(() => {
        jest.resetModules()
        axios = require('axios')
        pending = []
        axios.defaults.adapter = config => new Promise((resolve, reject) => {
            pending.push({ config, resolve: data => resolve({ data, config, status: 200 }), reject })
        })
        store = require('../store').default
        actions = require('./index').actions
        runSaga = require('redux-saga').runSaga
        handleAuthenticationErrors = require('../util/errorHandling').handleAuthenticationErrors
    })

    async function request(url) {
        await flush()
        const next = pending.shift()
        expect(next).toBeDefined()
        expect(next.config.url).toBe(url)
        return next
    }

    async function login(username = 'student') {
        store.dispatch(actions.requestLogin({ username, password: 'test-password' }))
        const credentials = await request('/students/login')
        credentials.resolve({ status: 0, username })
        const session = await request('/public/knock_door')
        session.resolve({ username })
        const profile = await request('/students/get_student')
        profile.resolve([{ username, newCourse: 1, host_kindID: 0 }])
        await flush()
    }

    test('does not publish login success until session and profile are verified', async () => {
        store.dispatch(actions.requestLogin({ username: 'student' }))
        const credentials = await request('/students/login')
        credentials.resolve({ status: 0, username: 'student' })
        const session = await request('/public/knock_door')
        expect(application().loggedIn).toBe(false)
        expect(application().isFetching).toBe(true)
        session.resolve({ username: 'student' })
        const profile = await request('/students/get_student')
        expect(application().loggedIn).toBe(false)
        profile.resolve([{ username: 'student', newCourse: 1 }])
        await flush()
        expect(application().loggedIn).toBe(true)
        expect(application().userInfo.username).toBe('student')
        expect(application().loginSource).toBe('credentials')
        expect(application().isFetching).toBe(false)
        store.dispatch(actions.updateCompanyInfo([]))
        await flush()
        expect(pending).toHaveLength(0)
    })

    test('missing cookie/session fails once without retrying login', async () => {
        store.dispatch(actions.requestLogin({ username: 'student' }))
        ;(await request('/students/login')).resolve({ status: 0, username: 'student' })
        ;(await request('/public/knock_door')).resolve({ username: '' })
        await flush()
        expect(application().loggedIn).toBe(false)
        expect(application().isFetching).toBe(false)
        expect(application().loginError.msg).toMatch(/登录状态未能保持/)
        expect(pending).toHaveLength(0)
    })

    test('a session for a different account is rejected', async () => {
        store.dispatch(actions.requestLogin({ username: 'student' }))
        ;(await request('/students/login')).resolve({ status: 0 })
        ;(await request('/public/knock_door')).resolve({ username: 'other' })
        await flush()
        expect(application().loggedIn).toBe(false)
        expect(application().loginError).toBeTruthy()
        expect(pending).toHaveLength(0)
    })

    test('an empty student profile cannot complete login', async () => {
        store.dispatch(actions.requestLogin({ username: 'student' }))
        ;(await request('/students/login')).resolve({ status: 0, username: 'student' })
        ;(await request('/public/knock_door')).resolve({ username: 'student' })
        ;(await request('/students/get_student')).resolve([])
        await flush()
        expect(application().loggedIn).toBe(false)
        expect(application().loginError).toBeTruthy()
    })

    test('credential rejection keeps the server message', async () => {
        store.dispatch(actions.requestLogin({ username: 'student' }))
        ;(await request('/students/login')).resolve({ status: 2, msg: '密码错误' })
        await flush()
        expect(application().loginError.msg).toBe('密码错误')
        expect(application().isFetching).toBe(false)
        expect(pending).toHaveLength(0)
    })

    test('HTTP failure during session verification clears the pending state', async () => {
        store.dispatch(actions.requestLogin({ username: 'student' }))
        ;(await request('/students/login')).resolve({ status: 0, username: 'student' })
        const session = await request('/public/knock_door')
        session.reject({ config: session.config, response: { status: 401 } })
        await flush()
        expect(application().loggedIn).toBe(false)
        expect(application().isFetching).toBe(false)
        expect(application().loginError).toBeTruthy()
        expect(pending).toHaveLength(0)
    })

    test('a late session-restore result cannot undo a newer login', async () => {
        store.dispatch(actions.confirmLogin())
        const oldSession = await request('/public/knock_door')
        await login()
        oldSession.resolve({ username: '' })
        await flush()
        expect(application().loggedIn).toBe(true)
        expect(application().username).toBe('student')
    })

    test('a late password-login result cannot replace the newer account', async () => {
        store.dispatch(actions.requestLogin({ username: 'old' }))
        const oldLogin = await request('/students/login')
        await login('new')
        oldLogin.resolve({ status: 0, username: 'old' })
        await flush()
        expect(application().username).toBe('new')
        expect(pending).toHaveLength(0)
    })

    test('a late profile refresh cannot erase the new session', async () => {
        await login('old')
        store.dispatch(actions.getUserInfo({ username: 'old' }))
        const oldProfile = await request('/students/get_student')
        await login('new')
        oldProfile.resolve({ username: '' })
        await flush()
        expect(application().loggedIn).toBe(true)
        expect(application().userInfo.username).toBe('new')
    })

    test('old 401/501 responses are ignored, current 401 still expires the session', async () => {
        await login('old')
        // Create the request before dispatching the new login, without yielding.
        const oldRequestPromise = axios.get('/old-course-request')
        store.dispatch(actions.requestLogin({ username: 'new' }))
        const oldRequest = await request('/old-course-request')
        ;(await request('/students/login')).resolve({ status: 0, username: 'new' })
        ;(await request('/public/knock_door')).resolve({ username: 'new' })
        ;(await request('/students/get_student')).resolve([{ username: 'new' }])
        await flush()
        oldRequest.resolve([])
        await oldRequestPromise
        for (const status of [401, 501]) {
            await runSaga({ getState: store.getState, dispatch: store.dispatch },
                handleAuthenticationErrors, { config: oldRequest.config, response: { status } }).toPromise()
            expect(application().loggedIn).toBe(true)
        }
        const currentPromise = axios.get('/current-course-request')
        const currentRequest = await request('/current-course-request')
        currentRequest.resolve([])
        await currentPromise
        await runSaga({ getState: store.getState, dispatch: store.dispatch },
            handleAuthenticationErrors, { config: currentRequest.config, response: { status: 401 } }).toPromise()
        expect(application().loggedIn).toBe(false)
        expect(application().loginStatusCode).toBe(401)
    })

    test('logout cancels a pending login', async () => {
        store.dispatch(actions.requestLogin({ username: 'student' }))
        const oldLogin = await request('/students/login')
        store.dispatch(actions.requestLogout())
        ;(await request('/students/logout')).resolve({ status: 0 })
        oldLogin.resolve({ status: 0, username: 'student' })
        await flush()
        expect(application().loggedIn).toBe(false)
        expect(application().isFetching).toBe(false)
        expect(pending).toHaveLength(0)
    })

    test('session restore validates student data without a credentials-success source', async () => {
        store.dispatch(actions.confirmLogin())
        ;(await request('/public/knock_door')).resolve({ username: 'student' })
        ;(await request('/students/get_student')).resolve([{ username: 'student' }])
        await flush()
        expect(application().loggedIn).toBe(true)
        expect(application().loginSource).toBe('session')
    })

    test('auditor login verifies the session without requesting a student profile', async () => {
        store.dispatch(actions.auditorRequestLogin({ username: 'auditor' }))
        ;(await request('/users/login')).resolve({ status: 0, username: 'auditor', auditor: 1, teacher: 0 })
        expect(application().loggedIn).toBe(false)
        ;(await request('/public/knock_door')).resolve({ username: 'auditor', auditor: 1 })
        await flush()
        expect(application().loggedIn).toBe(true)
        expect(application().auditor).toBe(1)
        expect(pending).toHaveLength(0)
    })
})
