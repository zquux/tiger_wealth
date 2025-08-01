import * as z from 'zod'

export const UserDtoSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string()
})
