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

export const validationAddToCartSchema = z.object({
  price: z
    .string({
      required_error: "السعر يجب أن لا يكون فارغًا",
    })
    .min(1, "السعر يجب أن يكون 1 دينار على الأقل")
    .max(5, "السعر يجب أن يكون 5 أرقام على الأكثر"),
  friendPhone: z
    .string()
    .min(10, "رقم الهاتف يجب أن يكون 10 أرقام على الأقل")
    .optional(),
});

export type ValidationAddToCartSchemaType = z.infer<
  typeof validationAddToCartSchema
>;

export const validationCardSchema = z.object({
  cardNumber: z
    .string({
      required_error: "رقم البطاقة يجب أن لا يكون فارغًا",
    })
    .min(16, "رقم البطاقة يجب أن يكون 16 رقمًا على الأقل")
    .max(16, "رقم البطاقة يجب أن يكون 16 رقمًا على الأكثر"),
  cardHolder: z
    .string({
      required_error: "اسم صاحب البطاقة يجب أن لا يكون فارغًا",
    })
    .min(3, "اسم صاحب البطاقة يجب أن يكون 3 أحرف على الأقل"),
  expiryDateMonth: z
    .string({
      required_error: "شهر انتهاء الصلاحية يجب أن لا يكون فارغًا",
    })
    .min(1, "شهر انتهاء الصلاحية يجب أن يكون 2 أحرف على الأقل")
    .max(2, "شهر انتهاء الصلاحية يجب أن يكون 2 أحرف على الأكثر"),
  expiryDateYear: z
    .string({
      required_error: "سنة انتهاء الصلاحية يجب أن لا يكون فارغًا",
    })
    .min(2, "سنة انتهاء الصلاحية يجب أن يكون 2 أحرف على الأقل")
    .max(2, "سنة انتهاء الصلاحية يجب أن يكون 2 أحرف على الأكثر"),
  cvv: z
    .string({
      required_error: "CVV يجب أن لا يكون فارغًا",
    })
    .min(3, "CVV يجب أن يكون 3 أرقام على الأقل")
    .max(3, "CVV يجب أن يكون 3 أرقام على الأكثر"),
});

export type ValidationCardSchemaType = z.infer<typeof validationCardSchema>;

export interface IUser {
  apiKey: string;
  appName: string;
  createdAt: string;
  email: string;
  emailVerified: boolean;
  isAnonymous: boolean;
  lastLoginAt: string;
  providerData: [
    {
      displayName?: string;
      email: string;
      phoneNumber?: string;
      photoURL?: string;
      providerId: string;
      uid: string;
    }
  ];
  stsTokenManager: {
    accessToken: string;
    expirationTime: number;
    refreshToken: string;
  };
  uid: string;
}
