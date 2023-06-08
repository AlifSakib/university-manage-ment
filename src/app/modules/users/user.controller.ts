import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catch_async from '../../../share/catch-async';
import send_response from '../../../share/send-response';
import { UserService } from './user.service';

const createUser = catch_async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req.body;
    const result = await UserService.create_user(user);

    send_response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User Created Successfully',
      data: result,
    });
    next();
  }
);

export const UserController = {
  createUser,
};
