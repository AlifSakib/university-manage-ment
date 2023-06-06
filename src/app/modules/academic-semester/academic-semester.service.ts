import httpStatus from 'http-status';
import ApiError from '../../../errors/api-error';
import { academic_semester_title_code_mapper } from './academic-semester.constant';
import { IAcademicSemester } from './academic-semester.interface';
import { AcademicSemester } from './academic-semester.model';

const create_semester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academic_semester_title_code_mapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.create(payload);
  return result;
};

export const academic_semester_service = {
  create_semester,
};
