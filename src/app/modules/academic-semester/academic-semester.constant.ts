import {
  IAcademicSemesterCode,
  IAcademicSemesterMonth,
  IAcademicSemesterTitle,
} from './academic-semester.interface';

export const academic_semester_months: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academic_semester_title: IAcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academic_semester_code: IAcademicSemesterCode[] = [
  '01',
  '02',
  '03',
];

export const academic_semester_title_code_mapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSearchAbleFields = ['title', 'code', 'year'];

export const academicSemesterFilterAbleFields = [
  'search_term',
  'title',
  'code',
  'year',
];
