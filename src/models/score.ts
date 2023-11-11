import { option } from "common/types";
import { ListResult } from "./app";

export interface Score {
    questions: number;
    reading_score: number;
    reading_id: number;
    listening_score: number;
    listening_id: number;
}

export type ScoreRequestResult = ListResult<Score>;

export interface SignleScore {
    id: number;
    questions: number;
    type: string;
    score: number;
}

export interface IScoreCreateRequest {
    questions: number;
    score: number;
    type: string;
}

export interface IScoreUpdateRequest {
    questions: number;
    score: number;
    type: string;
}

export interface IScoreDeleteData {
    questions: number;
    option: option[];
}