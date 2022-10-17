export default class HttpException extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public error?: string
  ) {
    super(message);
  }
}
