import { z } from "zod";

const opt = (max: number) =>
  z.string().trim().max(max).optional().transform((v) => (v ? v : null));

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255),
  company: opt(100),
  phone: opt(40),
  message: z.string().trim().min(10, "Tell us a bit more (10+ characters).").max(5000),
  service_interest: opt(200),
  budget: opt(100),
  preferred_contact: opt(50),
  preferred_date: opt(100),
});
export type EnquiryInput = z.infer<typeof enquirySchema>;
