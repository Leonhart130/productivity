<script lang="ts">
	import type { ActionData, PageData } from "./$types"
	import LoginForm from "./login-form.svelte"
	import Logo from "$lib/components/Logo.svelte"
	import { toast } from "svelte-sonner"

	// Props
	let { data, form }: { data: PageData; form: ActionData } = $props()

	$effect(() => {
		if (typeof form?.success === "boolean" && form.message) {
			if (!form.success) {
				toast.error(form.message)
			}
		}
	})
</script>

<svelte:head>
	<title>Login - Productivity</title>
</svelte:head>

<div class="h-svh w-full lg:grid lg:grid-cols-2">
	<div class="flex h-full items-center justify-center">
		<div class="mx-auto grid w-[350px] gap-6">
			<div class="grid gap-2 text-center">
				<h1 class="text-3xl font-bold">Login</h1>
				<p class="text-balance text-muted-foreground">
					Enter your email below to login to your account
				</p>
			</div>
			<LoginForm {data} />
			<div class="mt-4 text-center text-sm">
				Don&apos;t have an account?
				<a href="/auth/signup" class="underline"> Sign up </a>
			</div>
		</div>
	</div>
	<div class="hidden place-content-center border-l bg-background lg:grid">
		<Logo className="w-[45svw] hover:transition duration-500 hover:brightness-110" />
	</div>
</div>
