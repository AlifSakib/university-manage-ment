import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../interfaces/error';

export const handle_validation_error = (
  err: mongoose.Error.ValidationError
) => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  };
};

export default handle_validation_error;
