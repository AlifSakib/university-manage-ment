import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/api-error';
import { pagination_helper } from '../../../helpers/pagination-helper';
import { IGenericResponseType } from '../../../interfaces/common';
import { pagination_options_type } from '../../../interfaces/pagination';
import {
  academicSemesterSearchAbleFields,
  academic_semester_title_code_mapper,
} from './academic-semester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilters,
} from './academic-semester.interface';
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
  filters: IAcademicSemesterFilters,
  pagination_options: pagination_options_type
): Promise<IGenericResponseType<IAcademicSemester[]>> => {
  const { search_term, ...filtersData } = filters;

  const andConditions = [];

  if (search_term) {
    andConditions.push({
      $or: academicSemesterSearchAbleFields.map(field => ({
        [field]: {
          $regex: search_term,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  // const andConditions = [
  //   {
  //     $or: [
  //       {
  //         title: {
  //           $regex: search_term,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         code: {
  //           $regex: search_term,
  //           $options: 'i',
  //         },
  //       },
  //       {
  //         year: {
  //           $regex: search_term,
  //           $options: 'i',
  //         },
  //       },
  //     ],
  //   },
  // ];

  const { page, limit, skip, sort_by, sort_order } =
    pagination_helper.calculate_pagination(pagination_options);

  const sort_conditions: { [key: string]: SortOrder } = {};

  if (sort_by && sort_order) {
    sort_conditions[sort_by] = sort_order;
  }

  const where_condition =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await AcademicSemester.find(where_condition)
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

const get_single_semester = async (
  id: string
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

export const academic_semester_service = {
  create_semester,
  get_all_semesters,
  get_single_semester,
};
