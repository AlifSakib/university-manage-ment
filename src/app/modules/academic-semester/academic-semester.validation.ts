import { z } from 'zod';

// req vaidation
// body -> object
//data -> object
const create_academic_semester_zod_schema = z.object({
  body: z.object({
    title: z.enum(['Autumn', 'Summer', 'Fall'], {
      required_error: 'Title is Required',
    }),
    year: z.number({
      required_error: 'Year is Required',
    }),
    code: z.enum(['01', '02', '03'], {
      required_error: 'Code is Required',
    }),
    start_month: z.enum(
      [
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
      ],
      {
        required_error: 'Start Month is Required',
      }
    ),
    end_month: z.enum(
      [
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
      ],
      {
        required_error: 'End Month is Required',
      }
    ),
  }),
});
// await create_user_zod_schema.parseAsync(req)

export const academic_semester_validation = {
  create_academic_semester_zod_schema,
};
