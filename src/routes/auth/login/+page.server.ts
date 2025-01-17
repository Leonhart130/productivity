import type { Actions, PageServerLoad } from "./$types.js"
import { superValidate } from "sveltekit-superforms"
import { loginFormSchema } from "$lib/formSchemas.js"
import { zod } from "sveltekit-superforms/adapters"
import { fail, redirect } from "@sveltejs/kit"

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(loginFormSchema))
	}
}

export const actions: Actions = {
	default: async (event) => {
		const form = await superValidate(event, zod(loginFormSchema))
		if (!form.valid) {
			return fail(400, {
				form
			})
		}

		const { supabase } = event.locals
		const { error: loginError } = await supabase.auth.signInWithPassword({
			email: form.data.email,
			password: form.data.password
		})

		if (loginError) {
			console.error(loginError)
			// To prevent form reset
			form.valid = false

			let message = ""
			switch (loginError.code) {
				case "email_not_confirmed":
					message = "Veuillez confirmer votre email pour vous connecter."
					break
				case "invalid_credentials":
					message = "Email ou mot de passe invalide."
					break
				default:
					message = "Une erreur innatendue a eue lieu, contactez l'admin si ça persiste."
			}

			return {
				form,
				success: false,
				message: message
			}
		}

		redirect(302, "/auth/login")
	}
}
