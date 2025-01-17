import { z } from "zod"

export const loginFormSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(20)
})

export const signupFormSchema = z
	.object({
		username: z.string().min(3).max(20),
		email: z.string().email(),
		password: z
			.string()
			.min(6)
			.max(20)
			.refine(
				(password) =>
					/[a-z]/.test(password) && // At least one lowercase letter
					/[A-Z]/.test(password) && // At least one uppercase letter
					/\d/.test(password) && // At least one number
					/[^A-Za-z0-9]/.test(password) // At least one special character
			),
		passwordConfirm: z.string().min(6).max(20)
	})
	.refine((data) => data.password === data.passwordConfirm, {
		message: "Passwords do not match.",
		path: ["passwordConfirm"] // Points the error to `passwordConfirm`
	})

export type LoginFormSchema = typeof loginFormSchema
export type SignupFormSchema = typeof signupFormSchema
