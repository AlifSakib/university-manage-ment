import { Schema, model } from 'mongoose';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academic-semester.interface';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: { type: String, required: true },
    year: { type: Number, required: true },
    code: { type: String, required: true },
    start_month: { type: String, required: true },
    end_month: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
