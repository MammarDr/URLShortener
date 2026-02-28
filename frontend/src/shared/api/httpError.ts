export interface IErrorResposne {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors: Map<string, Array<string>>;
}

export class HttpError extends Error {
  public status: number;
  public body?: any;
  constructor(status: number, message: string, body?: IErrorResposne) {
    super(message);
    this.status = status;
    this.body = body;
  }

  static Unauthenticated({
    message = "Unauthenticated",
    body,
  }: { message?: string; body?: IErrorResposne } = {}) {
    return new HttpError(401, message, body);
  }
  static UnprocessableEntity({
    message = "Unprocessable Entity",
    body,
  }: { message?: string; body?: IErrorResposne } = {}) {
    return new HttpError(422, message, body);
  }
}
