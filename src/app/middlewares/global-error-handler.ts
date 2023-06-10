/* eslint-disable no-unused-expressions */
import { ErrorRequestHandler, Request, Response } from 'express';
import { Error } from 'mongoose';
import { ZodError } from 'zod';
import config from '../../config';
import ApiErrror from '../../errors/api-error';
import handleCastError from '../../errors/handle-cast-error';
import handle_validation_error from '../../errors/handle-validation-error';
import handleZodError from '../../errors/handle-zod-error';
import { IGenericErrorMessage } from '../../interfaces/error';
import { errorlogger, logger } from '../../share/logger';

const global_error_handler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response
) => {
  config.env === 'development'
    ? logger.info('Global Error Handler', err)
    : errorlogger.error('Global Error Handler', err);

  let statusCode = 500;
  let message = 'Something went wrong';
  let errorMessages: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError = handle_validation_error(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err instanceof ApiErrror) {
    statusCode = err?.statusCode;
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }
  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  });
};

export default global_error_handler;
