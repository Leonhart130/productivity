<script lang="ts">
	import type { WithoutChild } from "bits-ui"
	import * as FormPrimitive from "formsnap"
	import { Label } from "$lib/components/shadcn/ui/label/index.js"
	import { cn } from "$lib/components/shadcn/utils.js"

	let {
		ref = $bindable(null),
		children,
		class: className,
		...restProps
	}: WithoutChild<FormPrimitive.LabelProps> = $props()
</script>

<FormPrimitive.Label {...restProps} bind:ref>
	{#snippet child({ props })}
		<Label {...props} class={cn("data-[fs-error]:text-red-500/80", className)}>
			{@render children?.()}
		</Label>
	{/snippet}
</FormPrimitive.Label>
