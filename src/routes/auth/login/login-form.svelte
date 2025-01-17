<script lang="ts">
	import * as Form from "$lib/components/shadcn/ui/form/index.js"
	import { Input } from "$lib/components/shadcn/ui/input/index.js"
	import { loginFormSchema, type LoginFormSchema } from "$lib/formSchemas"
	import { type SuperValidated, type Infer, superForm } from "sveltekit-superforms"
	import { zodClient } from "sveltekit-superforms/adapters"

	let { data }: { data: { form: SuperValidated<Infer<LoginFormSchema>> } } = $props()

	const form = superForm(data.form, {
		validators: zodClient(loginFormSchema)
	})

	const { form: formData, enhance } = form
</script>

<form method="POST" use:enhance class="grid gap-2">
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
				<div class="flex items-center justify-between">
					<Form.Label>Password</Form.Label>
					<a href="/auth/recover" class="ml-auto inline-block text-sm underline">
						Forgot your password?
					</a>
				</div>
				<Input
					{...props}
					bind:value={$formData.password}
					type="password"
					minlength={6}
					maxlength={20}
				/>
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Button class="mt-1">Submit</Form.Button>
</form>
