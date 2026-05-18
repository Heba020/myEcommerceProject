import * as zod from "zod"

export const loginSchema = zod.object({
    email: zod.string().nonempty("Email is required").email("Invalid email address"),
    password: zod.string().nonempty("Password is required").min(6, "Password must be at least 6 characters,contain capital and small letters, numbers and special characters").regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-+.])(?=.{6,})/)


}).refine((data) => {return data.email.endsWith(".com") && data.email.includes("@");},
 {
    message: "Email must end with .com and contain @",
    path: ["email"],
})

export type loginSchemaValidation = zod.infer<typeof loginSchema>