import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrorMessage[];
};

export type IGenericResponseType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
