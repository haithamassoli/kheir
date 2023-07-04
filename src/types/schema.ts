import { z } from "zod";

export const validationSchema = z.object({
  email: z
    .string({
      required_error: "البريد الإلكتروني يجب أن لا يكون فارغًا",
    })
    .email("البريد الإلكتروني غير صالح"),
  password: z
    .string({
      required_error: "كلمة المرور يجب أن لا تكون فارغة",
    })
    .min(6, "كلمة المرور يجب أن تكون 6 أحرف على الأقل"),
});

export type ValidationSchemaType = z.infer<typeof validationSchema>;
