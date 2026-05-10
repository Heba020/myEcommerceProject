import * as zod from "zod"

export const registerSchema = zod.object({
    name: zod.string().nonempty("Name is required").min(3, "Name must be at least 3 characters").max(20, "Name must be at most 20 characters"),
    email: zod.string().nonempty("Email is required").email("Invalid email address"),
    password: zod.string().nonempty("Password is required").min(6, "Password must be at least 6 characters,contain capital and small letters, numbers and special characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+.])(?=.{6,})/),
    rePassword: zod.string().nonempty("Please re-enter your password"),
    phoneNumber: zod.string().nonempty("Phone number is required").regex(/^(\+2)?(01)[0-25]\d{8}$/, "phone number must be at least 11 digits and start with 01 or +201"),

}).refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"],
}).refine((data) => {return data.email.endsWith(".com") && data.email.includes("@");},
 {
    message: "Email must end with .com and contain @",
    path: ["email"],
})

export type registerSchemaValidation = zod.infer<typeof registerSchema>