import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import catch_async from '../../../share/catch-async';
import send_response from '../../../share/send-response';
import { academic_semester_service } from './academic-semester.service';

const create_semester = catch_async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academic_semester_data } = req.body;
    const result = await academic_semester_service.create_semester(
      academic_semester_data
    );

    send_response(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
    next();
  }
);

export const acamedic_semester_controller = {
  create_semester,
};
