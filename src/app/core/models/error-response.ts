export interface ErrorResponse{
  error : ErrorMessage;
  status: number;
}

export interface ErrorMessage{
    message: string;
    errors: {
      [key: string] : string[]
    };
}
