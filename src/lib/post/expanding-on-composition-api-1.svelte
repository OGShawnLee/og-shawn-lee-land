<script lang="ts" module>
  import { Code } from "$lib/components";

	export class Counter {
		public count = $state(0);
		public double = $derived(this.count * 2);

		private constructor(initial: number) {
			this.count = initial;
		}

		public increment(this: Counter) {
			this.count++;
		}

		public static create(initial: number) {
			const counter = new Counter(initial);

			counter.increment = counter.increment.bind(counter);

			return counter;
		}
	}
</script>

<script>
	const counter = Counter.create(10);
</script>

<Code>
	<div class="grid gap-4">
		<div class="flex gap-4">
			<output class="text-white"> Count: {counter.count} </output>
			<output class="text-white"> Double: {counter.double} </output>
		</div>
		<button class="code-button" onclick={counter.increment}> Increment </button>
	</div>
</Code>
