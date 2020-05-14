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
            "filename": ""
        }
    ]
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

8b. 获取认证项目所属课程列表   **GET:/course/getStudentCertCourseList**
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
            "paperID": 1,   //模拟考试试卷ID
            "certStatus": 0
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
            "paperID": 1,
            "certStatus": 0
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
            "statusName": "认证"
        }
    ]
    ```    

11a. 获取学员模拟考试题目   **GET:/students/getStudentQuestionList**
  * input  **paperID = api.11.paperID**
    ```
    {"paperID": "", 1} 
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
            "E": ""
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
            "E": ""
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
      "certID": "C001"
    }
    ```    

  * output  **//status：int, 0 成功  1 已有相同项目不能重复添加  9 其他;  msg：string, 提示信息**
    ```
    {"status": "", "msg": ""} 
    ```    
 
15. 学员删除所选证书项目   **POST:/students/remove_student_certificate**
  * input
    ```
    {
      "ID": "1"
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
