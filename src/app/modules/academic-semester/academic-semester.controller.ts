import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { pagination_constants } from '../../../constants/pagination-constants';
import catch_async from '../../../share/catch-async';
import pick from '../../../share/pick';
import send_response from '../../../share/send-response';
import { academicSemesterFilterAbleFields } from './academic-semester.constant';
import { IAcademicSemester } from './academic-semester.interface';
import { academic_semester_service } from './academic-semester.service';

const create_semester = catch_async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { ...academic_semester_data } = req.body;
    const result = await academic_semester_service.create_semester(
      academic_semester_data
    );

    send_response<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Created Successfully',
      data: result,
    });
    next();
  }
);

const get_all_semesters = catch_async(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, academicSemesterFilterAbleFields);
    const pagination_options = pick(req.query, pagination_constants);

    const result = await academic_semester_service.get_all_semesters(
      filters,
      pagination_options
    );

    send_response<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Fetched Successfully',
      meta: result.meta,
      data: result.data,
    });
    next();
  }
);

const get_single_semester = catch_async(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    const result = await academic_semester_service.get_single_semester(id);

    send_response<IAcademicSemester>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Academic Semester Fetched Successfully',
      data: result,
    });
    next();
  }
);

export const acamedic_semester_controller = {
  create_semester,
  get_all_semesters,
  get_single_semester,
};
