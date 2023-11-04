export interface AppConfig {
  openSideBar: boolean;
  sideBarWidth: number;
}

export type ValidationErrorMessage = {
  type: string;
  message: string;
}

export type ErrorResponse = {
  status: string;
  message: ValidationErrorMessage[] | string;
}
