import { Nullable } from '../Nullable';

interface HttpError extends Error {
  httpStatus: number;
}

interface HttpProblem extends HttpError {
  type: Nullable<string>;
  title: string;
  detail: string | null;
  businessCode: number;
  instance: string | null;
}

export class HttpErrorBase extends Error implements HttpProblem {
  type: Nullable<string> = null;
  httpStatus: number = 500;
  detail: Nullable<string> = null;
  instance: Nullable<string> = null;
  businessCode: number;
  title: string;

  constructor(
    detail: Nullable<string>,
    httpStatus: number,
    type: Nullable<string>,
    instance: Nullable<string>,
    title: string,
    businessCode: number
  ) {
    super();
    this.type = type;
    this.httpStatus = httpStatus;
    this.detail = detail;
    this.instance = instance;
    this.businessCode = businessCode;
    this.title = title;
  }
}
