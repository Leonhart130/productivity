import type { Actions, PageServerLoad } from "./$types.js"
import { fail } from "@sveltejs/kit"
import { signupFormSchema } from "$lib/formSchemas.js"
import { superValidate } from "sveltekit-superforms"
import { zod } from "sveltekit-superforms/adapters"

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(signupFormSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(signupFormSchema))
		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const { supabase } = event.locals
		const { error: signupError } = await supabase.auth.signUp({
			email: form.data.email,
			password: form.data.password,
			options: {
				data: {
					username: form.data.username
				}
			}
		})

		if (signupError) {
			console.error(signupError)
			return fail(400, {
				form,
				success: false
			})
		}

		// To prevent form reset
		form.valid = false
		return {
			form,
			success: true
		}
	}
}
