import { z } from "zod"

export const experienceSchema = z.object({
  company: z.string().min(1),
  role: z.string().min(1),
  years: z.number().min(0),
})

export const applicationSchema = z.object({
  personal: z.object({
    name: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(8),
    profile: z.string().url().optional().or(z.literal("")),
  }),
  experiences: z.array(experienceSchema).min(1),
  skills: z.array(z.string()).min(1),
})


export type ApplicationForm = z.infer<typeof applicationSchema>