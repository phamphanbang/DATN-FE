import { option } from "./types";

export const QueryKeys = {
  GET_ALL_USERS: 'getAllUsers',
  GET_USER: 'getUser',
  GET_ALL_BLOGS: 'getAllBlogs',
  GET_BLOG: 'getBlog'
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
];