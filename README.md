https://app.moqups.com/86RO0q4xgE
remote desk:  47.100.186.148 
video.js: https://www.jb51.net/article/145346.htm

## user interface for student
//respone.sessionExpire: !=1 可用  1 已过期
//*必填  R只读

0. 询问过期  **POST:/knock_door**
  * input   
    ```
    nothing
    ``` 

  * output  **//if username > "" is alive, == "" is dead**
    ```
    {
        "username": "120107196604032113"
    }
    ```    


1. 学员登录   **POST:/students/login** 
  * input   **//host:子域名 host="sino" when the url=sino.elearning.com/students/login**
    ```
    {"username":"xxx", "password":"123", "host":"sino"}
    ``` 

  * output  **//status：int, 0 成功  1 用户不存在  2 用户禁用  3 密码错误  9 其他;  msg：string, 提示信息; sessionExpire: !=1 可用  1 已过期**
    ```
    {
        "status": 0,
        "msg": "登录成功",
        "username": "120107196604032113",
        "hostName": "中石化上海石化公司",
        "newCourse": 1
    }
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
            "logo": "users\\upload\\companies\\logo\\spc.png",
            "deptID": 8,
            "deptName": "中石化上海石化公司"
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
  * input **//如果host='znxf', 不显示companyID, dept1, dept2, dept3，显示unit, dept. 否则相反。**
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
      "unit": "上海地铁公司",  //单位
      "dept": "第一运营公司",
      "mobile": "138018888888",   //*
      "phone": "",                //单位电话
      "email": "xxx.s@www.com",   //*
      "address": "",              //联系地址
      "education": 2,             //*学历
      "experience": "2002年-2021年在上海地铁公司从事电工检修工作。",      
      "memo": ""
    }
    ```

  * output  **//status：int, 0 成功  1 用户已存在  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

3. 学员重置密码   **POST:/public/reset_student_password**
  * input
    ```
    {
      "username":"",
      "mobile":""
    }
    ```    

  * output  **//status：int, 0 成功  1 用户不存在  2 手机错误;  msg：string, 提示信息   成功后返回登录页面**
    ```
    {
      "status": "0", 
      "msg": "密码重置成功，请注意接收短信。"
    } 
    ```    

4. 学员修改密码   **POST:/students/change_passwd**
  * input
    ```
    {
      "username":"",
      "mobile":"",
      "password":""
    }
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
      "password": "123",  //*   
      "companyID": "",    //R
      "dept1": "",        //*
      "dept1Name": "",    //*
      "dept2": "",
      "dept3": "",
      "job": "",
      "unit": "上海地铁公司",
      "dept": "第一运营公司",
      "mobile": "",       //*
      "phone": "",
      "email": "",        //*
      "address": "",        
      "limitDate": "",    //R
      "education": 1,     //*
      "experience": "2002年-2021年在上海地铁公司从事电工检修工作。",        
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

5b. 上传学员身份证正面   **POST:/files/uploadSingle**
  * input   **只能上传一张照片，重复上传将覆盖前文件.**
    ```
    //username（照片所属学员的身份证号）及upID需要在query中传递。示例中的upID="student_IDcardA", name="avatar", enctype="multipart/form-data"必须遵守。
    {"username":"120107196604032113", upID="student_IDcardA"}
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
        "file": "users\\upload\\students\\IDcards\\120107196604032113.jpeg"  //实际保存的路径
    }
    ```    

5c. 上传学员学历证明   **POST:/files/uploadSingle**
  * input   **只能上传一张照片，重复上传将覆盖前文件.**
    ```
    //username（照片所属学员的身份证号）及upID需要在query中传递。示例中的upID="student_education", name="avatar", enctype="multipart/form-data"必须遵守。
    {"username":"120107196604032113", upID="student_education"}
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
        "file": "users\\upload\\students\\educations\\120107196604032113.jpeg"  //实际保存的路径
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
            "name": "刘禹锡",
            "password": "123",
            "birthday": "1966-04-03",
            "sex": 1,
            "age": 54,
            "kindID": 0,
            "companyID": 8,
            "dept1": 1,
            "dept2": 16,
            "dept3": 0,
            "job": "",
            "unit": "上海地铁公司",
            "dept": "第一运营公司",
            "mobile": "13331111222",
            "phone": "77777",
            "email": "x.x@x.com",
            "address": "湖里毛路300号",
            "user_status": 0,
            "limitDate": "",
            "education": 3,
            "educationName": "高中",
            "host": "spc",
            "photo_filename": "\\upload\\students\\photos\\120107196604032113.png",  //if photo is null, show the default picture as "/public/images/guy.png"
            "memo": "",
            "regDate": "2020-05-02",
            "statusName": "正常",
            "hostName": "中石化上海石化公司",
            "dept1Name": "公司本部",
            "dept2Name": "发展规划部",
            "dept3Name": "",
            "companyName": "中石化上海石化公司",
            "sexName": "男",
            "IDa_filename": "",
            "IDb_filename": "",
            "kindName": "系统内",
            "photo": 1,
            "experience": "2002年-2021年在上海地铁公司从事电工检修工作。",      
            "newMessage": 0,
            "newCourse": 0,
            "host_kindID": 0    //0 集團用戶 可選課  1 其他用戶 不能選課
        }
    ]
    ```

6a. 获取下级单位列表   **GET:/public/getDeptListByPID**
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

6b. 获取学历列表   **GET:/public/getDicListByKind**
  * input   **kindID: 'education'**
    ```
    {"kindID": "education"}
    ``` 

  * output   ****
    ```
    [
        {
            "ID": 0,
            "item": ''
        },
        {
            "ID": 1,
            "item": '小学'
        },
        {
            "ID": 2,
            "item": '初中'
        }
    ] 
    ``` 

7. 获取学员课程列表   **GET:/students/getStudentCourseList**
  * input
    ```
    {"username":"120107196604032113"}
    ``` 

  * output   ****
     
    ```
    [
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
                "courseName": "安全概论",
                "pass_condition": "考试成绩达到80分",
                "re": 0,    //如果re=1, 课程名称显示为courseName(reexamineName)格式：安全概论(初训)
                "reexamineName": "初训"
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
                "courseName": "危险品",
                "pass_condition": "完成率达到98%"
                "re": 1,    
                "reexamineName": "初训"
             }
    ]
    ```

8. 获取学员已选认证列表   **GET:/students/getStudentCertPickList**
  * input
    ```
    {"username":"120107196604032113"}
    ``` 

  * output   ****
    ```
    [
        {
            "ID": 1,
            "username": "120107196604032113",
            "certID": "C001",
            "certName": "危化品安全运输",
            "agencyName": "安监局",
            "kindID": 0,
            "status": 0,
            "examScore": 0,
            "diplomaID": "",
            "host": "spc",
            "memo": "",
            "regDate": "2020-05-08",
            "registerID": "120107196604032113",
            "statusName": "待执行",
            "kindName": "公用",
            "score": 0,
            "startDate": "",
            "endDate": "",
            "filename": "",
            "completion": 0,    //0 取消时不提示  >0 取消时提示（先判断cancelAllow）
            "cancelAllow": 0,    //0 允许取消  1 不允许取消
            "re": 0,    //如果re=1, 课程名称显示为certName(reexamineName)危化品安全运输(初训)
            "reexamineName": "初训"
         }
    ]
    ```

8a. 获取学员可选认证列表   **GET:/students/getStudentCertRestList**
  * input
    ```
    {"username":"120107196604032113"}
    ``` 

  * output   **you need only [certID, certName, reexamine] **
    ```
    [
        {
            "ID": 2,
            "certID": "C2",
            "certName": "危险化学品消防",
            "mark": 0,
            "reexamine": 0    //0 普通  1 选择“初训/复训”  初训0 复训 1
        },
        {
            "ID": 4,
            "certID": "C3",
            "certName": "作业审批及监护培训",
            "mark": 0,
            "reexamine": 0
        },
        {
            "ID": 8,
            "certID": "L8",
            "certName": "应急管理",
            "mark": 1,
            "reexamine": 1
        }
    ]
    ```

8b. 获取认证项目所属课程列表   **GET:/students/getStudentCertCourseList**
  * input
    ```
    {"username":"120107196604032113"}
    ``` 

  * output   **refID = API.8.ID**
    ```
    [
        {
            "ID": 1,
            "username": "120107196604032113",
            "courseID": "L001",
            "refID": 1,
            "kindID": 0,
            "status": 0,
            "hours": 40,  //课时
            "hoursSpend": 0,
            "startDate": "",  //开始日期
            "endDate": "",    //结束日期
            "host": "spc",
            "memo": "",
            "regDate": "2020-05-08T15:19:44.020Z",
            "registerID": "120107196604032113",
            "statusName": "待执行",
            "courseName": "安全概论",
            "completion": 12.55,  //课程完成度%
            "examScore": 0, //模拟考试最好成绩
            "examTimes": 0, //模拟考试次数
            "paperID": "[{paperID:6846,item:'应知(初训)'},{paperID:6844,item:'应会(识别判断)'}]",   //试卷ID  0 不顯示考試鏈接  >0 顯示考試鏈接
            "type": 0,      //0 模拟考试  1 考試
            "certStatus": 0,
            "cancelAllow": 0,
            "projectID": "P-21-004"
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
            "courseName": "危险品",
            "completion": 0,
            "examScore": null,
            "examTimes": 0, 
            "paperID": 1,   //试卷ID  0 不顯示考試鏈接  >0 顯示考試鏈接
            "type": 0,      //0 模拟考试  1 考試
            "certStatus": 0,
            "cancelAllow": 0
        }
    ]
    ```

9. 获取学员课节列表   **GET:/students/getStudentLessonList**
  * input   **by username**
    ```
    {"username":"120107196604032113"}
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
  * input   **refID = api.9/9a 中的 ID**
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
 
9c. 获取学员课节课件信息   **GET:/students/getStudentCourseware**
  * input   **refID = api.9/9a 中的 ID**
    ```
    {"refID":1}
    ``` 

  * output  
    ```
    [
        {
            "ID": 1,
            "coursewareID": "W001",
            "refID": 1,
            "kindID": 0,
            "status": 0,
            "proportion": 10,
            "pages": 20,
            "maxPage": 0,
            "lastPage": 0,
            "startDate": "",
            "lastDate": "",
            "statusName": "待执行",
            "coursewareName": "讲义",
            "filename": "users\\upload\\courses\\coursewares\\W001.pdf",
            "type": "pdf"
        },
        {
            "ID": 2,
            "coursewareID": "W002",
            "refID": 1,
            "kindID": 0,
            "status": 0,
            "proportion": 10,
            "pages": 35,
            "maxPage": 0,
            "lastPage": 0,
            "startDate": "",
            "lastDate": "",
            "statusName": "待执行",
            "coursewareName": "案例分析",
            "filename": "users\\upload\\courses\\coursewares\\W002.ppt",
            "type": "ppt"
        }
    ]
    ```
   
10.  学员视频进度保存（每10s将当前播放位置上传到服务器）   **POST:/students/update_video_currentTime**
  * input
    ```
    {"ID":1, "currentTime":"5500"}
    ```

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    
   
10a.  学员课件进度保存（每次翻页将当前播放位置上传到服务器）   **POST:/students/update_courseware_currentPage**
  * input
    ```
    {"ID":1, "currentPage":"5"}
    ```

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

11. 获取学员模拟试卷信息   **GET:/students/getStudentExamInfo**
  * input  **paperID = api.8b.paperID**
    ```
    {"paperID": "", 1} 
    ```    

  * output  
    ```
    [
        {
            "paperID": 1,
            "examID": "T1",
            "refID": 1,
            "kindID": 0,
            "status": 0,            //0 准备中  1 已开始  2 已交卷
            "minutes": 90,          //考试总时长（分钟）
            "secondRest": 5400,     //剩余秒数
            "score": 0,             //学员得分
            "startDate": "",        //开始时间
            "endDate": "",          //交卷时间
            "lastDate": "",         //最后提交时间
            "scorePass": 80,        //及格分数线
            "scoreTotal": 100,      //试卷总分
            "statusName": "认证",
            "missingItems": "学历, 单位电话, 手机号码, 单位地址, 工作岗位"
        }
    ]
    ```    

11a. 获取学员模拟考试题目   **GET:/students/getStudentQuestionList**
  * input  **paperID = api.11.paperID**
    ```
    {
      "paperID": 1, 
      "mark": 0     //0 获取现有题目  1 重新生成题目
    } 
    ```    

  * output  
    ```
    [
        {
            "ID": 91,
            "questionID": "P3",
            "refID": 1,
            "status": 0,
            "scorePer": 1,      //标准得分
            "score": 0,         //实际得分
            "myAnswer": null,   //学员提交的答案
            "questionName": "生产劳动过程中，由于生产劳动的客观条件和人的主观状况，造成危害人的安全与健康的因素很多。这些因素归纳起来大体上可以分为两大类，即环境的因素和人为因素。",
            "kindID": 3,        //1 单选题  2 多选题  3 判断题    列表已经按照kindID排序（升序）
            "answer": "B",      //标准答案
            "A": "对",
            "B": "错",
            "C": "",
            "D": "",
            "E": "",
            "image": "/upload/students/diplomas/S8D003.jpg",
            "imageA": "",
            "imageB": "",
            "imageC": "",
            "imageD": "",
            "imageE": ""
        },
        {
            "ID": 53,
            "questionID": "P9",
            "refID": 1,
            "status": 0,
            "scorePer": 1,
            "score": 0,
            "myAnswer": null,
            "questionName": "保护从业人员在生产劳动过程中的生命安全，是我国坚持社会主义制度的本质要求，也是发展社会主义经济，走可持续发展道路的重要内容。",
            "kindID": 3,
            "answer": "A",
            "A": "对",
            "B": "错",
            "C": "",
            "D": "",
            "E": "",
            "image": "",
            "imageA": "",
            "imageB": "",
            "imageC": "",
            "imageD": "",
            "imageE": ""
        }
    ]
    ```

12. 上传学员模拟考试答案   **POST:/students/update_student_question_answer**
  * input 
    ```
    {
      "ID": 1,            //api.11a.ID
      "answer": "ABD"
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

12a. 上传学员模拟考试剩余时间   **POST:/students/update_student_exam_secondRest**
  * input 
    ```
    {
      "paperID": 1,            //api.11.paperID
      "secondRest": 2300       //当前考试剩余秒数
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

13. 模拟考试交卷   **POST:/students/submit_student_exam**
  * input
    ```
    {
      "paperID": 1    //api.11.paperID  or  api.11a.refID
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    

14. 学员添加新证书项目   **POST:/students/add_student_certificate**
  * input
    ```
    {
      "username": "120107196604032113",
      "certID": "C001",
      "mark": 0,     //0 证书  1 课程
      "reexamine": 0   //0 初训  1 复训
    }
    ```    

  * output  **//status：int, 0 成功  1 已有相同项目不能重复添加  2 缺少材料  9 其他;  msg：string, 提示信息**
    ```
    {
      "status": 2, 
      "msg": "请先上传照片，然后再来选课。"
    } 
    ```    
 
15. 学员删除所选证书项目   **POST:/students/remove_student_certificate**
  * input
    ```
    {
      "ID": "1",
      "mark": 0     //0 证书  1 课程
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    
 
16. 学员提交反馈意见   **POST:/students/submit_student_feedback**
  * input
    ```
    {
      "username": "120107196604032113",
      "mobile": "12222222",
      "email": "xxx@xx.com",
      "kindID": "0",
      "item": "请问这个东西怎么做？",
      "refID": "0"
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": "0", "msg": ""} 
    ```    
 
17. 学员反馈意见分类   **GET:/students/getDictionaryList**
  * input
    ```
    {
      "kind": "feedback"
    }
    ```    

  * output  
    ```
    [
        {
            "ID": "0",
            "item": "故障报告"
        },
        {
            "ID": "1",
            "item": "咨询"
        },
        {
            "ID": "2",
            "item": "投诉"
        },
        {
            "ID": "3",
            "item": "建议"
        },
        {
            "ID": "9",
            "item": "其他"
        }
    ]    
    ```    
 
18. 学员消息列表   **GET:/students/get_student_message_List**
  * input
    ```
    {
      "username": "120107196604032113"
    }
    ```    

  * output  
    ```
    [
        {
            "ID": 2,
            "username": "120109199305280017",
            "item": "正在处理中，请耐心地等",
            "refID": 0,
            "kindID": 0,      //0 回复  1 通知  9 其他
            "status": 0,      //0 未读  1 已读  2 撤销
            "emergency": 0,   //0 一般  1 紧急
            "readDate": "",
            "host": "spc",
            "memo": "",
            "regDate": "2020-05-13 16:25:19",
            "registerID": "albert",
            "kindName": "回复",
            "statusName": "未读",
            "emergencyName": "一般"
        },
        {
            "ID": 1,
            "username": "120109199305280017",
            "item": "您反馈的信息意见收到",
            "refID": 0,
            "kindID": 0,
            "status": 0,
            "emergency": 0,
            "readDate": "",
            "host": "spc",
            "memo": "",
            "regDate": "2020-05-13 16:24:42",
            "registerID": "albert",
            "kindName": "回复",
            "statusName": "未读",
            "emergencyName": "一般"
        }
    ]
    ```    
 
19. 学员消息   **GET:/students/get_student_message_info**
  * input
    ```
    {
      "ID": "2"   //api.18.ID
    }
    ```    

  * output  
    ```
    [
        {
            "ID": 2,
            "username": "120109199305280017",
            "item": "正在处理中，请耐心地等",
            "refID": 0,
            "kindID": 0,      //0 回复  1 通知  9 其他
            "status": 0,      //0 未读  1 已读  2 撤销
            "emergency": 0,   //0 一般  1 紧急
            "readDate": "",
            "host": "spc",
            "memo": "",
            "regDate": "2020-05-13 16:25:19",
            "registerID": "albert",
            "kindName": "回复",
            "statusName": "未读",
            "emergencyName": "一般"
        }
    ]
    ```   

20. 学员证书列表   **GET:/students/get_student_diploma_list**
  * input
    ```
    {
      "username": "120107196604032113",
      "certID": "C1"  //可以是空值，将返回所有证书
    }
    ```    

  * output  **//D 显示  M标识**
    ```
    [
        {
            "ID": 3,
            "diplomaID": "SH2034232-201",
            "username": "120107196604032113",
            "certID": "C1",
            "status": 0,                          //M 0 有效 1 失效  不同颜色标识
            "score": 0,
            "term": 3,
            "startDate": "2018-01-02",
            "endDate": "2021-01-01",              //D有期限
            "filename": "",                       //D图片文件链接
            "memo": "",
            "regDate": "2020-05-19",
            "registerID": "albert",
            "name": "刘禹锡",
            "sex": 1,
            "age": 54,
            "host": "spc",
            "dept1": 1,
            "dept2": 16,
            "mobile": "13331111222",
            "email": "x.x@x.com",
            "hostName": "中石化上海石化公司",
            "dept1Name": "公司本部",
            "dept2Name": "发展规划部",
            "sexName": "男",
            "kindName": "系统内",
            "kindID": 0,
            "certName": "危险化学品从业人员",     //D
            "agencyName": "应急管理局\r\n",
            "agencyID": "1",
            "statusName": "有效",               //D
            "registerName": "李嘉图",               //D
            "filename": "/upload/students/diplomas/SPCC5--00051.pdf"
        }
    ]
    ```    

21. 学员证书信息   **GET:/students/get_student_diploma_info**
  * input
    ```
    {
      "ID": 3
    }
    ```   

  * output  **显示内容D**
    ```
    [
        {
            "ID": 3,
            "diplomaID": "SH2034232-201",       //D
            "username": "120107196604032113",
            "certID": "C1",
            "status": 0,                        //0 有效  1 失效
            "score": 0,
            "term": 3,                          //D 有效期
            "startDate": "2018-01-02",          //D 发证日期
            "endDate": "2021-01-01",            //D 有效日期
            "filename": "",                     //D 电子证书link
            "memo": "",
            "regDate": "2020-05-19",
            "registerID": "albert",
            "name": "刘禹锡",
            "sex": 1,
            "age": 54,
            "host": "spc",
            "dept1": 1,
            "dept2": 16,
            "mobile": "13331111222",
            "email": "x.x@x.com",
            "hostName": "中石化上海石化公司",
            "dept1Name": "公司本部",
            "dept2Name": "发展规划部",
            "sexName": "男",
            "kindName": "系统内",
            "kindID": 0,
            "certName": "危险化学品从业人员",      //D 证书名称
            "agencyName": "应急管理局\r\n",       //D 发证机构
            "agencyID": "1",
            "statusName": "有效",                 //D 证书状态
            "registerName": "李嘉图"
        }
    ]
    ```    
 
22. 为通过考试的学员批量生成证书   **POST:/outfiles/generate_diploma_byCertID**
  * input
    ```
    {
      "certID": "C1",
      "host": "spc",
      "username": "admin.spc" 
    }
    ```    

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {
      "status": "", 
      "msg": "",
      "filename": "/upload/students/genDiploma/diploma1.pdf"
    } 
    ```    
 
23. 返回某个批次的证书列表   **GET:/public/getDiplomaListByBatchID**
  * input
    ```
    {
      "batchID": 1
    }
    ```    

  * output  **//记录集**
    ```
    recordset 
    ```    
 
24. 返回学员注册报表   **GET:/public/getRptList**
  * input
    ```
    {
      "op": "student",
      "mark":"data",    //'data':json data, 'file':excel file
      "host": "spc",
      "startDate":"",
      "endDate":"",
      "kindID":"",
      "groupHost":1,
      "groupDept1":0,
      "groupKindID":0,
      "groupDate":"month"
    }
    ```    

  * output  **//记录集**
    ```
    recordset 
    ```    

25. 查找学员   **GET:/students/find_student**
  * input
    ```
    {"find":"120107196604032113"}   //可以输入姓名、身份证，模糊查询
    ``` 

  * output   
    
    ```
    [
        {
            "username": "120107196604032113",
            "name": "刘禹锡",
            "hostName": "中石化上海石化公司"
        }
    ]
    ```

26. 获取证书项目列表   **GET:/students/get_cert_list**
  * input
    ```
    {
      
    } 
    ``` 

  * output   
    
    ```
    [
        {
            "certID": "C1",
            "certName": "危险化学品从业人员"
        },
        {
            "certID": "C2",
            "certName": "危险化学品消防"
        },
        {
            "certID": "C3",
            "certName": "作业票审批资格证"
        },
        {
            "certID": "C4",
            "certName": "施工作业现场监护证"
        },
        {
            "certID": "C5",
            "certName": "施工作业上岗证"
        }
    ]
    ```

27. 获取缺失证书编号列表   **GET:/students/get_reexamine_diploma_list**
  * input
    ```
    {
        "username": "120107196604032113"
    } 
    ``` 

  * output   
    
    ```
    [
        {
            "enterID": 11,
            "item": "参加复审的危险化学品消防证书编号"
        },
        {
            "enterID": 18,
            "item": "参加复审的危险化学品从业人员证书编号"
       }
    ]
    ```

28. 获取漏填项目信息   **GET:/students/get_student_need2complete**
  * input
    ```
    {
        "enterID": 23   //8b.ID  getStudentCertCourseList
    } 
    ``` 

  * output   
    
    ```
    "学历, 单位电话, 手机号码, 单位地址, 工作岗位"
    ```

29. 保存缺失证书编号列表   **POST:/students/set_reexamine_diploma**
  * input
    ```
    {
      "list":
      [
          {
              "enterID": 11,
              "item": "3102308439-232-01"
          },
          {
              "enterID": 18,
              "item": "FXS2303-2323323X"
        }
      ]
    }
    ``` 

  * output   
    
    ```
    {
        "status": 0,
        "msg": ""
    } 
    ```


101. 用户登录   **POST:/users/login** 
  * input   **//host:子域名 host="sino" when the url=sino.elearning.com/students/login**
    ```
    {"username":"xxx", "password":"123", "host":"spc"}
    ``` 

  * output  **//status：int, 0 成功  1 用户不存在  2 用户禁用  3 密码错误  9 其他;  msg：string, 提示信息; sessionExpire: !=1 可用  1 已过期**
    ```
    {
        "status": 0,
        "msg": "登录成功",
        "username": "albert",
        "name": "林冲",
        "hostName": "中石化上海石化公司",
        "auditor": 1
    }
    ```    

102. 用户登出   **GET:/users/logout** 
  * input   
    ```
    nothing
    ``` 

  * output  **//status：int, 0 成功  9 其他;  msg：string, 提示信息**
    ```
    {"status": 0, "msg": "成功退出。"} 
    ```    
