<script lang="ts">
	import * as Form from "$lib/components/shadcn/ui/form/index.js"
	import { Input } from "$lib/components/shadcn/ui/input/index.js"
	import { signupFormSchema, type SignupFormSchema } from "$lib/formSchemas"
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms"
	import { zodClient } from "sveltekit-superforms/adapters"
	import { Check, X } from "lucide-svelte"
	import { slide } from "svelte/transition"

	let { data }: { data: { form: SuperValidated<Infer<SignupFormSchema>> } } = $props()

	const form = superForm(data.form, {
		validators: zodClient(signupFormSchema)
	})
	const { form: formData, enhance } = form

	let passwordIsSafe = $state({
		lowercase: false,
		uppercase: false,
		digit: false,
		special: false,
		length: false
	})

	$effect(() => {
		passwordIsSafe.lowercase = /[a-z]/.test($formData.password)
		passwordIsSafe.uppercase = /[A-Z]/.test($formData.password)
		passwordIsSafe.digit = /\d/.test($formData.password)
		passwordIsSafe.special = /[!@#$%^&*(),.?":{}|<>]/.test($formData.password)
		passwordIsSafe.length = $formData.password.length >= 6 && $formData.password.length <= 20
	})
</script>

<form method="POST" use:enhance class="grid gap-2">
	<Form.Field {form} name="username">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Username</Form.Label>
				<Input
					{...props}
					bind:value={$formData.username}
					type="username"
					minlength={3}
					maxlength={20}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input {...props} bind:value={$formData.email} type="email" />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input
					{...props}
					bind:value={$formData.password}
					type="password"
					minlength={6}
					maxlength={20}
				/>
			{/snippet}
		</Form.Control>
	</Form.Field>
	<Form.Field {form} name="passwordConfirm">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password confirmation</Form.Label>
				<Input
					{...props}
					bind:value={$formData.passwordConfirm}
					type="password"
					minlength={6}
					maxlength={20}
				/>
			{/snippet}
		</Form.Control>
	</Form.Field>
	{#if $formData.password.length > 0}
		<div class="mt-2 flex flex-col text-sm text-muted-foreground" transition:slide>
			{#if passwordIsSafe.lowercase}
				<div class="flex items-center gap-1">
					<Check class="rounded-full border p-0.5 text-green-500/80" />
					Password contains a lowercase letter
				</div>
			{:else}
				<div class="flex items-center gap-1">
					<X class="rounded-full border p-0.5 text-red-500/80" />
					Password doesn't contain a lowercase letter
				</div>
			{/if}
			{#if passwordIsSafe.uppercase}
				<div class="flex items-center gap-1">
					<Check class="rounded-full border p-0.5 text-green-500/80" />
					Password contains a uppercase letter
				</div>
			{:else}
				<div class="flex items-center gap-1">
					<X class="rounded-full border p-0.5 text-red-500/80" />
					Password doesn't contain an uppercase letter
				</div>
			{/if}
			{#if passwordIsSafe.digit}
				<div class="flex items-center gap-1">
					<Check class="rounded-full border p-0.5 text-green-500/80" />
					Password contains a digit
				</div>
			{:else}
				<div class="flex items-center gap-1">
					<X class="rounded-full border p-0.5 text-red-500/80" />
					Password doesn't contain a digit
				</div>
			{/if}
			{#if passwordIsSafe.special}
				<div class="flex items-center gap-1">
					<Check class="rounded-full border p-0.5 text-green-500/80" />
					Password contains a special character
				</div>
			{:else}
				<div class="flex items-center gap-1">
					<X class="rounded-full border p-0.5 text-red-500/80" />
					Password doesn't contain a special character
				</div>
			{/if}
			{#if passwordIsSafe.length}
				<div class="flex items-center gap-1">
					<Check class="rounded-full border p-0.5 text-green-500/80" />
					Password is between 6 to 20 characters
				</div>
			{:else}
				<div class="flex items-center gap-1">
					<X class="rounded-full border p-0.5 text-red-500/80" />
					Password is not between 6 to 20 characters
				</div>
			{/if}
			{#if $formData.password === $formData.passwordConfirm}
				<div class="flex items-center gap-1">
					<Check class="rounded-full border p-0.5 text-green-500/80" />
					Passwords match
				</div>
			{:else}
				<div class="flex items-center gap-1">
					<X class="rounded-full border p-0.5 text-red-500/80" />
					Passwords don't match
				</div>
			{/if}
		</div>
	{/if}
	<Form.Button class="mt-1">Submit</Form.Button>
</form>
