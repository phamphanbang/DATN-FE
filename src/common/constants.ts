import { option } from "./types";

export const QueryKeys = {
  GET_ALL_USERS: 'getAllUsers',
  GET_USER: 'getUser',
  GET_ALL_BLOGS: 'getAllBlogs',
  GET_BLOG: 'getBlog',
  GET_ALL_SCORE: 'getAllScore',
  GET_SCORE: 'getScore',
  GET_ALL_TEMPLATE: 'getAllTemplate',
  GET_TEMPLATE: 'getTemplate',
  GET_ALL_EXAMS: 'getAllExams',
  GET_ALL_TEMPLATE_WITHOUT_PART: 'getALlTemplateWithoutPart',
  GET_EXAM: 'getExam',
  USER_GET_ALL_EXAMS: 'userGetAllExams',
  USER_GET_HOME: 'userGetHome',
  USER_GET_EXAM: 'userGetExam',
  USER_GET_HISTORY_DETAIL: 'userGetHistoryDetail'
}

export const userRole: option[] = [
  {
    value: "superadmin",
    label: "Super Admin"
  },
  {
    value: "admin",
    label: "Admin"
  },
  {
    value: "user",
    label: "User",
  }
]

export const createUserRole: option[] = [
  {
    value: "superadmin",
    label: "Super Admin"
  },
  {
    value: "admin",
    label: "Admin"
  },
  {
    value: "user",
    label: "User",
  }
]

export const scoreType: option[] = [
  {
    value: "reading",
    label: "Reading"
  },
  {
    value: "listening",
    label: "Listening"
  }
]

export const templateStatus: option[] = [
  {
    value: "active",
    label: "Active"
  },
  {
    value: "disable",
    label: "Disable"
  }
]

export const examStatus: option[] = [
  {
    value: "active",
    label: "Active"
  },
  {
    value: "disable",
    label: "Disable"
  },
  {
    value: 'draft',
    label: 'Draft'
  }
]

export const partType: option[] = [
  {
    value: "reading",
    label: "Reading"
  },
  {
    value: "listening",
    label: "Listening"
  }
]

export const partTypeValue = {
  READING: 'reading',
  LISTENING: 'listening'
}

export const hasGroupQuestionType : option[] = [
  {
    value: "true",
    label: "True"
  },
  {
    value: "false",
    label: "False"
  }
]

export const numOfAnswers : option[] = [
  {
    value: "3",
    label: "3"
  },
  {
    value: "4",
    label: "4"
  }
]

export const noOfRows: option[] = [
  {
    value: 10,
    label: 10,
  },
  {
    value: 25,
    label: 25,
  },
  {
    value: 50,
    label: 50,
  },
  {
    value: 100,
    label: 100,
  },
  {
    value: 999,
    label: 999
  }
];