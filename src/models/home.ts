import { UserBlog } from "./blog";
import { Exam } from "./exam";

export interface IHomeResult {
    exams: Exam[];
    blogs: UserBlog[];
}