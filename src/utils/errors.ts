export const ERRORS = {
  400: 'Bad Request',
  404: 'Not Found',
  422: 'Unprocessable Entity',
} as { [key: number]: string };

export enum ERROR_CODE {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  UNPROCESSABLE_ENTITY = 422
}