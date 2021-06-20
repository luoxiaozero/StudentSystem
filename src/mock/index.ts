import Mock from "mockjs";

Mock.mock("/api/login", {
  code: 200,
  data: {
    token: "22222222222222222222222",
  },
});

Mock.mock("/api/sdept/create", {
  code: 200,
});

Mock.mock("/api/sdept", {
  code: 200,
  data: [
    {
      id: 1,
      name: "计算机系",
    },
    {
      id: 2,
      name: "英语系",
    },
  ],
});

Mock.mock("/api/major/create", {
  code: 200,
});

Mock.mock("/api/major?sdeptId=1", {
  code: 200,
  data: [
    {
      id: 1,
      name: "计算机科学与技术",
    },
    {
      id: 2,
      name: "软件工程",
    },
  ],
});

Mock.mock("/api/major?sdeptId=2", {
  code: 200,
  data: [
    {
      id: 1,
      name: "英语教育",
    },
    {
      id: 2,
      name: "文化与传播",
    },
  ],
});

Mock.mock("/api/class/create", {
  code: 200,
});

Mock.mock("/api/teacher/create", {
  code: 200,
});

Mock.mock("/api/class?majorId=1", {
  code: 200,
  data: [
    {
      id: 1,
      name: "一班",
      graduationYear: "2021",
    },
    {
      id: 2,
      name: "二班",
      graduationYear: "2021",
    },
  ],
});

Mock.mock("/api/class?majorId=2", {
  code: 200,
  data: [
    {
      id: 3,
      name: "一班",
      graduationYear: "2020",
    },
    {
      id: 4,
      name: "二班",
      graduationYear: "2020",
    },
  ],
});

Mock.mock("/api/student/create", {
  code: 200,
});

Mock.mock("/api/student/grade", {
  code: 200,
  data: [
    {
      courseName: "操作系统",
      beginYear: 1600520530000,
      endYear: 1624107702406,
      grade: 100,
    },
    {
      courseName: "计算机网络",
      beginYear: 1600520530000,
      endYear: 1624107702406,
      grade: 100,
    },
  ],
});

Mock.mock("/api/student?classId=1", {
  code: 200,
  data: [
    {
      id: 2020020000,
      name: "张三s",
    },
    {
      id: 2020020000,
      name: "李四",
    },
  ],
});
Mock.mock("/api/student?classId=2", {
  code: 200,
  data: [
    {
      id: 2020020000,
      name: "张三r",
    },
    {
      id: 2020020000,
      name: "李四",
    },
  ],
});
Mock.mock("/api/student?classId=3", {
  code: 200,
  data: [
    {
      id: 2020020000,
      name: "张三w",
    },
    {
      id: 2020020000,
      name: "李四",
    },
  ],
});
Mock.mock("/api/student?classId=4", {
  code: 200,
  data: [
    {
      id: 2020020000,
      name: "张三2",
    },
    {
      id: 2020020000,
      name: "李四",
    },
  ],
});
Mock.mock("/api/admin/course", {
  code: 200,
  data: [
    {
      courseName: "操作系统",
      beginYear: 1600520530000,
      endYear: 1624107702406,
      teacherName: "张三",
    },
    {
      courseName: "计算机网络",
      beginYear: 1600520530000,
      endYear: 1624107702406,
      teacherName: "张三",
    },
  ],
});

Mock.mock("/api/teacher/course", {
  code: 200,
  data: [
    {
      courseName: "操作系统",
      beginYear: 1600520530000,
      endYear: 1624107702406,
      courseId: 1,
    },
    {
      courseName: "计算机网络",
      beginYear: 1600520530000,
      endYear: 1624107702406,
      courseId: 2,
    },
  ],
});

Mock.mock("/api/course/1/grade", {
  code: 200,
  data: {
    courseId: 1,
    courseName: "操作系统",
    students: [
      {
        id: 1,
        name: "string",
        grade: 200,
      },
      {
        id: 2,
        name: "string",
        grade: 200,
      },
      {
        id: 3,
        name: "string",
        grade: 200,
      },
    ],
  },
});


Mock.mock("/api/course/grade/update", {
  code: 200,
});