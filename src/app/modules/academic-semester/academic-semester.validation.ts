import { z } from 'zod';
import {
  academic_semester_code,
  academic_semester_months,
  academic_semester_title,
} from './academic-semester.constant';

// req vaidation
// body -> object
//data -> object
const create_academic_semester_zod_schema = z.object({
  body: z.object({
    title: z.enum([...academic_semester_title] as [string, ...string[]], {
      required_error: 'Title is Required',
    }),
    year: z.string({
      required_error: 'Year is Required',
    }),
    code: z.enum([...academic_semester_code] as [string, ...string[]], {
      required_error: 'Code is Required',
    }),
    start_month: z.enum(
      [...academic_semester_months] as [string, ...string[]],
      {
        required_error: 'Start Month is Required',
      }
    ),
    end_month: z.enum([...academic_semester_months] as [string, ...string[]], {
      required_error: 'End Month is Required',
    }),
  }),
});
// await create_user_zod_schema.parseAsync(req)

const update_academic_semester_zod_schema = z
  .object({
    body: z.object({
      title: z
        .enum([...academic_semester_title] as [string, ...string[]], {
          required_error: 'Title is Required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year is Required',
        })
        .optional(),
      code: z
        .enum([...academic_semester_code] as [string, ...string[]], {
          required_error: 'Code is Required',
        })
        .optional(),
      start_month: z
        .enum([...academic_semester_months] as [string, ...string[]], {
          required_error: 'Start Month is Required',
        })
        .optional(),
      end_month: z
        .enum([...academic_semester_months] as [string, ...string[]], {
          required_error: 'End Month is Required',
        })
        .optional(),
    }),
  })
  .refine(
    data =>
      (data.body.title && data.body.code) ||
      (!data.body.title && !data.body.code),
    {
      message: 'Either Title or Code is Required',
    }
  );

export const academic_semester_validation = {
  create_academic_semester_zod_schema,
  update_academic_semester_zod_schema,
};
