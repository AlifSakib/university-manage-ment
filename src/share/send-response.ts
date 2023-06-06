import { Response } from 'express';

type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T | null;
};

const send_response = <T>(res: Response, data: IApiResponse<T>): void => {
  const response_data: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    message: data.message || null,
    data: data.data || null,
  };
  res.status(data.statusCode).json(response_data);
};

export default send_response;
