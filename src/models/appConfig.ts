export interface AppConfig {
  openSideBar: boolean;
  sideBarWidth: number;
}

export type FormParams = Record<
  string,
  string
>;

export type ValidationErrorMessage = {
  type: string;
  message: string;
}

export type ValidationError = {
  status: string;
  message: ValidationErrorMessage[] | [];
}
