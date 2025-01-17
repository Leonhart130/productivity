<script lang="ts">
	import type { ActionData, PageData } from "./$types"
	import SignupForm from "./signup-form.svelte"
	import Logo from "$lib/components/Logo.svelte"
	import { toast } from "svelte-sonner"

	// Props
	let { data, form }: { data: PageData; form: ActionData } = $props()

	$effect(() => {
		if (typeof form?.success === "boolean") {
			if (form.success) {
				toast.success(
					"Inscription réussie ! Veuillez confirmer votre email pour vous connecter."
				)
			} else {
				toast.error("Une erreur a eue lieu, veuillez contacter l'admin si ça persiste")
			}
		}
	})
</script>

<svelte:head>
	<title>Signup - Productivity</title>
</svelte:head>

<div class="h-svh w-full lg:grid lg:grid-cols-2">
	<div class="flex h-full items-center justify-center">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Sign up</h1>
				<p class="text-balance text-muted-foreground">Enter your email below to sign up</p>
			</div>
			<SignupForm {data} />
			<div class="mt-4 text-center text-sm">
				Already have an account ?
				<a href="/auth/login" class="underline"> Log in </a>
			</div>
		</div>
	</div>
	<div class="hidden place-content-center border-l bg-background lg:grid">
		<Logo className="w-[45svw] hover:transition duration-500 hover:brightness-110" />
	</div>
</div>
