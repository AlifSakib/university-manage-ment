import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/api-error';
import { pagination_helper } from '../../../helpers/pagination-helper';
import { IGenericResponseType } from '../../../interfaces/common';
import { pagination_options_type } from '../../../interfaces/pagination';
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

const get_all_semesters = async (
  pagination_options: pagination_options_type
): Promise<IGenericResponseType<IAcademicSemester[]>> => {
  const { page, limit, skip, sort_by, sort_order } =
    pagination_helper.calculate_pagination(pagination_options);

  const sort_conditions: { [key: string]: SortOrder } = {};

  if (sort_by && sort_order) {
    sort_conditions[sort_by] = sort_order;
  }

  const result = await AcademicSemester.find()
    .sort(sort_conditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicSemester.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const academic_semester_service = {
  create_semester,
  get_all_semesters,
};
