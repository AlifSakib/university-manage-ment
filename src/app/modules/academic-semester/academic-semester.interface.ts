import { Model } from 'mongoose';

export type IAcademicSemester = {
  title: string;
  year: number;
  code: string;
  start_month: string;
  end_month: string;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
