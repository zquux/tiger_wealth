import * as z from 'zod'

export const SignupSchema = z.object({
  email: z.string().trim().email('Please enter a valid email'),
  password: z
    .string()
    .trim()
    .min(8, 'Please enter at least 8 characters')
    .max(64, 'Please enter at most 64 characters')
})

export type SignupSchema = z.infer<typeof SignupSchema>
