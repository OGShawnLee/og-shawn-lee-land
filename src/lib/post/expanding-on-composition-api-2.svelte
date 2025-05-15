<script lang="ts" module>
	import type { Computed, Ref } from '$lib/vue.svelte';
	import { computed, ref } from '$lib/vue.svelte';

	export class Person {
		public name: Ref<string>;
		public lastName: Ref<string>;
		public fullName: Computed<string>;

		public constructor(name: string, lastName: string) {
			this.name = ref(name);
			this.lastName = ref(lastName);
			this.fullName = computed(() => {
				const clearName = this.capitalize(this.name.value).trim();
				const clearFinalName = this.capitalize(this.lastName.value).trim();
				return clearName + ' ' + clearFinalName;
			});
		}

		private capitalize(str: string): string {
			return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
		}
	}
</script>

<script lang="ts">
	import { Code } from '$lib/components';

	const person = new Person('Shawn', 'Lee');
</script>

<Code>
	<div class="grid gap-4">
		<div class="grid gap-2">
			<output class="text-white"> Name: {person.name.value} </output>
			<output class="text-white"> Last Name: {person.lastName.value} </output>
			<output class="text-white"> Full Name: {person.fullName.value} </output>
		</div>
		<div class="flex gap-4">
			<input
				class="px-4 bg-transparent border-b-2 border-neutral-900 placeholder-stone-600 outline-none focus:border-red-500"
				type="text"
				bind:value={person.name.value}
				placeholder="Name"
				maxlength="16"
			/>
			<input
				class="px-4 bg-transparent border-b-2 border-neutral-900 placeholder-stone-600 outline-none focus:border-red-500"
				type="text"
				bind:value={person.lastName.value}
				placeholder="Last Name"
				maxlength="16"
			/>
		</div>
	</div>
</Code>
