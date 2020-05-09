https://app.moqups.com/86RO0q4xgE
remote desk:  47.100.186.148  administrator/Shznxfxx119
video.js: https://www.jb51.net/article/145346.htm

## user interface for student
//respone.sessionExpire: !=1 可用  1 已过期
//*必填  R只读

1. 学员登录   **POST:/students/login** 
  * input   **//host:子域名 host="sino" when the url=sino.elearning.com/students/login**
    ```
    {"username":"xxx", "password":"123", "host":"sino"}
    ``` 

  * output  **//status：int, 0 成功  1 用户不存在  2 用户禁用  3 密码错误  9 其他;  msg：string, 提示信息; sessionExpire: !=1 可用  1 已过期**
    ```
    {"status": "", "msg": "", "sessionExpire": 0} 
    ```    

1a. 获取公司信息   **GET:/public/getCompanyByHost** 
  * input   
    ```
    nothing   //系统将根据学员URL.host自动识别公司属性
    ``` 

  * output  
    ```
    [
        {
            "hostNo": "spc",
            "hostName": "中石化上海石化公司",
            "logo": "users\\upload\\companies\\logo\\spc.png"
        }
    ]
    ```    

1b. 学员登出   **GET:/students/logout** 
  * input   
    ```
    nothing
    ``` 

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": 0, "msg": "成功退出。"} 
    ```    

2. 学员注册   **POST:/students/new_student**
  * input
    ```
    {
      "username": "120107196604032113",   //*
      "name": "张三",   //*
      "password": "239000wc",   //*
      "kindID": "0",    //0:系统内单位  1:系统外单位
      "companyID": "8", //*
      "dept1": "1",     //*
      "dept1Name": "公司总部",  //*
      "dept2": "12",
      "dept3": "0",
      "job": "",
      "mobile": "138018888888",   //*
      "phone": "",
      "email": "xxx.s@www.com",   //*
      "memo": ""
    }
    ```

  * output  **//status：int, 0 成功  1 用户已存在  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

3. 学员重置密码   **POST:/ use the same API of /students/change_passwd**
  * input
    ```
 
    ```    

4. 学员修改密码   **POST:/students/change_passwd**
  * input
    ```
    {"username":"", "email":"", "password":""}
    ``` 

  * output  **//status：int, 0 成功  1 用户不存在  2 用户禁用  3 邮箱错误  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

5. 学员修改信息   **POST:/students/update_student**
  * input   **当kindID=1(系统外单位)时，允许在dept1中输入新的单位名称(dept1=0, dept1Name名称长度最少为4，提交后系统将自动保存新单位)；kindID=0时dept1/2/3中只能选择列表中的单位**
    ```
    {
      "username": "120107196604032113",   //只读
      "name": "Albert",   //*   
      "kindID": 0,
      "companyID": "",    //R
      "dept1": "",        //*
      "dept1Name": "",    //*
      "dept2": "",
      "dept3": "",
      "job": "",
      "mobile": "",       //*
      "phone": "",
      "email": "",        //*
      "limitDate": "",    //R
      "memo": ""
    }
    ```

  * output  **//status：int, 0 成功 2 用户不存在 9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

5a. 上传学员照片   **POST:/files/uploadSingle**
  * input   **只能上传一张照片，重复上传将覆盖前文件.**
    ```
    //username（照片所属学员的身份证号）及upID需要在query中传递。示例中的upID="student_photo", name="avatar", enctype="multipart/form-data"必须遵守。
    {"username":"120107196604032113", upID="student_photo"}
    <form action="/files/uploadSingle" method="post" enctype="multipart/form-data">
        <h2>单图上传</h2>
        <input type="file" name="avatar">
        <input type="submit" value="提交">
    </form>
    ``` 

  * output  **//status：int, 0 成功  1 文件格式不支持  2 大小超过限制  3 文件不存在  9 其他;  msg：string, 提示信息**
    ```
    {
        "status":0 ,
        "msg":"" ,
        "file": "users\\upload\\students\\photos\\120107196604032113.jpeg"  //实际保存的路径
    }
    ```    

6. 学员信息获取   **GET:/students/get_student**
  * input
    ```
    {"username":"120107196604032113"}
    ``` 

  * output   **kindID: int, 0 系统内单位  1 系统外单位**
    
    ```
    [
        {
            "userID": 1,
            "username": "120107196604032113",
            "name": "albert",
            "password": "123",
            "birthday": "1966-04-03",
            "sex": 1,
            "age": 54,
            "kindID": 0,
            "companyID": 8,
            "dept1": 1,
            "dept2": 11,
            "dept3": 0,
            "job": "",
            "mobile": "13331111222",
            "phone": "77777",
            "email": "x.x@x.com",
            "user_status": 0,
            "limitDate": "",
            "host": "sino",
            "photo_filename": "",
            "memo": "",
            "regDate": "2020-05-02",
            "statusName": "正常",
            "hostName": "上海石化公司",
            "dept1Name": "公司本部",
            "dept2Name": "总经理办公室",
            "dept3Name": "",
            "companyName": "上海石化公司",
            "sexName": "男"
        }
    ]
    ```

6a. 获取下级单位列表   **GET:/public/get_deptListByPID**
  * input   **pID: 本单位ID; kindID: 0 系统内单位  1 系统外单位. 取自学员信息中的kindID**
    ```
    {"pID":8, "kindID":0}
    ``` 

  * output   **dept_status: int, 0 有效  1 关闭**
    ```
    [
        {
            "deptID": 7,
            "pID": 8,
            "deptName": "松金分公司",
            "kindID": 0,
            "liniker": "",
            "phone": "",
            "address": "",
            "email": "",
            "dept_status": 0,
            "memo": "",
            "host": "sino",
            "regDate": "2017-06-06",
            "registerID": "albert",
            "statusName": "有效"
        },
        {
            "deptID": 1,
            "pID": 8,
            "deptName": "公司本部",
            "kindID": 0,
            "liniker": "",
            "phone": "",
            "address": "",
            "email": "",
            "dept_status": 0,
            "memo": "",
            "host": "sino",
            "regDate": "2017-06-06",
            "registerID": "albert",
            "statusName": "有效"
        }
    ] 
    ``` 

7. 获取学员课程列表   **GET:/students/getStudentCourseDetailList**
  * input
    ```
    {"username":"120107196604032113"}
    ``` 

  * output   ****
     
    ```
    {
        "courses": [
            {
                "ID": 1,
                "username": "120107196604032113",
                "courseID": "L001",
                "refID": 1,
                "kindID": 0,
                "status": 0,
                "hours": 40,
                "hoursSpend": 0,
                "startDate": "",
                "endDate": "",
                "host": "spc",
                "memo": "",
                "regDate": "2020-05-08T15:19:44.020Z",
                "registerID": "120107196604032113",
                "statusName": "待执行",
                "courseName": "安全概论"
            },
            {
                "ID": 2,
                "username": "120107196604032113",
                "courseID": "L002",
                "refID": 1,
                "kindID": 0,
                "status": 0,
                "hours": 40,
                "hoursSpend": 0,
                "startDate": "",
                "endDate": "",
                "host": "spc",
                "memo": "",
                "regDate": "2020-05-08T15:19:44.020Z",
                "registerID": "120107196604032113",
                "statusName": "待执行",
                "courseName": "危险品"
            }
        ],
        "lessons": [
            {
                "ID": 1,
                "lessonID": "N001",
                "refID": 1,
                "kindID": 0,
                "status": 0,
                "hours": 20,
                "completion": 0,
                "startDate": "",
                "memo": "",
                "regDate": "2020-05-08T15:19:44.020Z",
                "registerID": "120107196604032113",
                "statusName": "待执行",
                "lessonName": "安全概述",
                "seq": 1
            },
            {
                "ID": 2,
                "lessonID": "N002",
                "refID": 1,
                "kindID": 0,
                "status": 0,
                "hours": 20,
                "completion": 0,
                "startDate": "",
                "memo": "",
                "regDate": "2020-05-08T15:19:44.020Z",
                "registerID": "120107196604032113",
                "statusName": "待执行",
                "lessonName": "安全规范",
                "seq": 2
            },
            {
                "ID": 3,
                "lessonID": "N003",
                "refID": 2,
                "kindID": 0,
                "status": 0,
                "hours": 40,
                "completion": 0,
                "startDate": "",
                "memo": "",
                "regDate": "2020-05-08T15:19:44.020Z",
                "registerID": "120107196604032113",
                "statusName": "待执行",
                "lessonName": "火灾",
                "seq": 1
            }
        ]
    }
    ```

8a. 获取学员可选认证列表   **GET:/students/getStudentCertRestList**
  * input
    ```
    {"username":"120107196604032113"}
    ``` 

  * output   **you need only [certID, certName]**
    ```
    [
        {
            "ID": 2,
            "certID": "C002",
            "certName": "工业安全生产",
            "kindID": 0,
            "agencyID": "1",
            "status": 0,
            "term": 5,
            "memo": "",
            "regDate": "2020-05-08",
            "registerID": "albert",
            "agencyName": "安监局\r\n",
            "kindName": "公用",
            "statusName": "有效",
            "host": ""
        },
        {
            "ID": 3,
            "certID": "C003",
            "certName": "火灾救援",
            "kindID": 0,
            "agencyID": "1",
            "status": 0,
            "term": 3,
            "memo": "",
            "regDate": "2020-05-08",
            "registerID": "albert",
            "agencyName": "安监局\r\n",
            "kindName": "公用",
            "statusName": "有效",
            "host": ""
        }
    ]
    ```

8b. 获取认证项目所属课程列表   **GET:/course/getCourseListByCertID**
  * input
    ```
    {"certID":"C001"}
    ``` 

  * output   
    ```
    [
        {
            "ID": 1,
            "courseID": "L001",
            "courseName": "安全概论",
            "kindID": 0,
            "certID": "C001",
            "hours": 40,
            "status": 0,
            "memo": "",
            "regDate": "2020-05-08",
            "registerID": "albert",
            "statusName": "有效"
        },
        {
            "ID": 2,
            "courseID": "L002",
            "courseName": "危险品",
            "kindID": 0,
            "certID": "C001",
            "hours": 40,
            "status": 0,
            "memo": "",
            "regDate": "2020-05-08",
            "registerID": "albert",
            "statusName": "有效"
        }
    ]
    ```

9. 获取学员课节列表   **GET:/students/getStudentLessonList**
  * input   **refID = api.7 /students/getStudentCourseList 中的 ID**
    ```
    {"refID":1, }
    ``` 

  * output   
    ```
    [
        {
            "ID": 1,
            "lessonID": "N001",
            "refID": 1,
            "kindID": 0,
            "status": 0,
            "hours": 20,
            "completion": 0,
            "startDate": "",
            "memo": "",
            "regDate": "2020-05-08T15:19:44.020Z",
            "registerID": "120107196604032113",
            "statusName": "待执行",
            "lessonName": "安全概述",
            "seq": 1
        },
        {
            "ID": 2,
            "lessonID": "N002",
            "refID": 1,
            "kindID": 0,
            "status": 0,
            "hours": 20,
            "completion": 0,
            "startDate": "",
            "memo": "",
            "regDate": "2020-05-08T15:19:44.020Z",
            "registerID": "120107196604032113",
            "statusName": "待执行",
            "lessonName": "安全规范",
            "seq": 2
        }
    ]
    ```

9a. 获取学员课节信息   **GET:/students/getStudentLesson**
  * input   **ID = api.9 /students/getStudentLessonList 中的 ID**
    ```
    {"ID":1}
    ``` 

  * output  
    ```
    [
        {
            "ID": 1,
            "lessonID": "N001",
            "refID": 1,
            "kindID": 0,
            "status": 0,
            "hours": 20,
            "completion": 0,
            "startDate": "",
            "memo": "",
            "regDate": "2020-05-08T15:19:44.020Z",
            "registerID": "120107196604032113",
            "statusName": "待执行",
            "lessonName": "安全概述",
            "seq": 1
        }
    ]
    ```
 
9b. 获取学员课节视频信息   **GET:/students/getStudentVideo**
  * input   **refID = api.9a /students/getStudentLesson 中的 ID**
    ```
    {"refID":1}
    ``` 

  * output  
    ```
    [
        {
            "ID": 1,
            "videoID": "V001",
            "refID": 1,
            "kindID": 0,
            "status": 0,
            "proportion": 80,
            "minutes": 90,
            "maxTime": 0,
            "lastTime": 0,
            "startDate": "",
            "lastDate": "",
            "memo": "",
            "statusName": "待执行",
            "videoName": "安全概述",
            "type": "mp4",
            "filename": "users\\upload\\courses\\videos\\v001.mp4"
        }
    ]
    ```
   
10. 学员视频进度保存（定时将当前播放位置上传到服务器）   **POST:/students/save_video_maxTime**
  * input
    ```
    {"username":"", "lessonNo":"", "classID":"", "currentTime":""}
    ```

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

11. 获取学员练习信息   **GET:/students/get_exercise**
  * input  **//exerciseNo: int, 0 新练习  >0 已保存练习**
    ```
    {"username": "", "lessonNo": "", "classID": "", "exerciseNo": ""} 
    ```    

  * output  **//exercise_status: 0 未提交 1 已提交； status：0 成功  1 未找到  9 其他; showAnswer: 0 不立刻显示参考答案  1 立刻显示参考答案;  availableTimes: 0 不允许开始新练习  >0 允许开始新练习**
    ```
    {
      "exerciseNo": "",
      "lessonName": "",
      "className": "",
      "exercise_status": "",
      "exercise_score": "",
      "showAnswer": "",
      "availableTimes": "",
      "lastDate": "",
      "typeList": [
        {
          "typeID": "",
          "typeName": "",
          "problemList": [
            {
              "problemID": "",
              "problem": "",
              "refAnswer": "",
              "itemList": [
                {
                  "itemID": "",
                  "item": "",
                  "answer": ""
                }
              ]
            }
          ]
        }
      ],
      "status": ""
    }
    ```

12. 上传学员练习答案   **POST:/students/save_exercise_answer**
  * input 
    ```
    {
      "exerciseNo": "",
      "problemID": "",
      "itemList": [
        {
          "itemID": "",
          "answer": ""
        }
      ]
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

13. 提交学员练习   **POST:/students/submit_exercise**
  * input
    ```
    {
      "exerciseNo": ""
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

14. 学员添加新证书项目   **POST:/students/add_certificate**
  * input
    ```
    {
      "username": "",
      "certID": ""
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    
 
15. 学员删除所选证书项目   **POST:/students/remove_certificate**
  * input
    ```
    {
      "username": "",
      "certID": ""
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    
