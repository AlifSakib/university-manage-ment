import httpStatus from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/api-error';
import {
  academic_semester_code,
  academic_semester_months,
  academic_semester_title,
} from './academic-semester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academic-semester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true, enum: academic_semester_title },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: academic_semester_code },
    start_month: {
      type: String,
      required: true,
      enum: academic_semester_months,
    },
    end_month: { type: String, required: true, enum: academic_semester_months },
  },
  {
    timestamps: true,
  }
);

// Handling same year and same semester issue
academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'Acamedic Semester is already exist !'
    );
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
