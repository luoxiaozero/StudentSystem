

# API

### 登录 POST /api/:type/login

  **type:**  teacher | student | admin

**请求参数**

| 参数     | 请求类型 | 说明 |
| -------- | -------- | ---- |
| account  | post     | 账号 |
| password | post     | 密码 |

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data":{
        "token":"string"
    }
}
```



### 新建系部 POST /api/sdept/create

**请求参数**

| 参数 | 请求类型 | 说明   |
| ---- | -------- | ------ |
| name | post     | 系部名 |

**返回信息**

```json
{
  "code": "number",
  "msg": "string"
}
```



### 查询系部 GET /api/sdept

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data": [
    {
      "id":"number",
      "name": "string"
    }
  ]
}
```



### 新建专业 POST /api/major/create

**请求参数**

| 参数    | 请求类型 | 说明   |
| ------- | -------- | ------ |
| name    | post     | 专业名 |
| sdeptId | post     | 系部id |

**返回信息**

```json
{
  "code": "number",
  "msg": "string"
}
```



### 查询专业 GET /api/major

**请求参数**

| 参数    | 请求类型 | 说明 |
| ------- | -------- | ---- |
| sdeptId | post     | 系id |

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data": [
    {
      "id":"number",
      "name": "string"
    }
  ]
}
```



### 新建班级 POST /api/class/create

**请求参数**

| 参数           | 请求类型 | 说明                    |
| -------------- | -------- | ----------------------- |
| name           | post     | 班级名                  |
| graduationYear | post     | 届 (例：2021)（string） |
| majorId        | post     | 专业 id                 |

**返回信息**

```json
{
  "code": "number",
  "msg": "string"
}
```



### 查询班级 GET /api/class

**请求参数**

| 参数    | 请求类型 | 说明   |
| ------- | -------- | ------ |
| majorId | post     | 专业id |

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data": [
    {
      "id":"number",
      "name": "string",
      "graduationYear": "year"
    }
  ]
}
```



### 新建教工 POST /api/teacher/create

**请求参数**

| 参数    | 请求类型 | 说明     |
| ------- | -------- | -------- |
| id      | post     | 教工号   |
| name    | post     | 教工名   |
| sdeptId | post     | 所属系id |

**返回信息**

```json
{
  "code": "number",
  "msg": "string"
}
```



### 查询教工 GET /api/teacher

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data":[
        {
            "id":"number",
            "name":"string",
            "sdeptName":"string"
        }
    ]
}
```



### 新建学生 POST /api/student/create

**请求参数**

| 参数    | 请求类型 | 说明       |
| ------- | -------- | ---------- |
| id      | post     | 学生学号   |
| name    | post     | 学生姓名   |
| sdeptId | post     | 所属系id   |
| majorId | post     | 所属专业id |
| classId | post     | 所属班级id |

**返回信息**

```json
{
  "code": "number",
  "msg": "string"
}
```



### 新建课程 POST /api/course/create

**请求参数**

| 参数      | 请求类型 | 说明         |
| --------- | -------- | ------------ |
| name      | body     | 课程名       |
| teacherId |          | 教工 id      |
| beginDate | 时间戳   | 学期开始     |
| endDate   | 时间戳   | 学期结束     |
| classIds  |          | 班级 id 数组 |

**返回信息**

```json
{
  "code": "number",
  "msg": "string"
}
```



### 查询学生 GET /api/student

**请求参数**

| 参数    | 请求类型 | 说明    |
| ------- | -------- | ------- |
| classId | post     | 班级 id |

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data":[
      {
          "id":"number",
          "name":"string",
      }
  ]
}
```





### 查询课堂(老师查询) GET /api/teacher/course

**返回信息**

```json
{
  "code": "number",
   "msg": "string",
  "data":[
      {
          "courseId": "number",
          "courseName":"string",
          "beginDate":"timestamp",
          "endDate":"timestamp",
      }
  ]
}
```



### 查询成绩（老师) GET /api/course/:cid/grade

**返回信息**

```json
{
  "code": "number",
   "msg": "string",
  "data": {
      "courseId":"number",
      "courseName":  "string",
      "students":[
      {
          "id":"number",
          "name":"string",
          "grade":"number"
      }
  ]
  }
}
```



### 录入成绩（老师) POST /api/course/:cid/grade/update

**请求参数**

| 参数      | 请求类型 | 说明    |
| --------- | -------- | ------- |
| studentId | body     | 学生 id |
| courseId  | body     | 课程 id |
| grade     | body     | 成绩    |

**返回信息**

```json
{
  "code": "number",
}
```

### 查询课堂(管理员查询) GET /api/admin/course

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data":[
      {
          "courseName":"String",
          "beginDate":"timestamp",
          "endDate":"timestamp",
          "teacherName": "string"
      }
  ]
}
```



### 查询成绩(学生查询) GET /api/student/grade

**返回信息**

```json
{
  "code": "number",
  "msg": "string",
  "data":[
      {
          "courseName":"String",
          "beginDate":"timestamp",
          "endDate":"timestamp",
          "grade":"number"
      }
  ]
}
```

