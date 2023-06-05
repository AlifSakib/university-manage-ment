import { z } from 'zod'

// req vaidation
// body -> object
//data -> object
const create_user_zod_schema = z.object({
  body: z.object({
    role: z.string({
      required_error: 'Role is required',
    }),
    password: z.string().optional(),
  }),
})
// await create_user_zod_schema.parseAsync(req)

export const UserValidation = {
  create_user_zod_schema,
}
