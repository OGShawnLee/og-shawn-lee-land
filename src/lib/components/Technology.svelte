<script lang="ts">
  import { Cloud, Code, Database, Hammer } from "lucide-svelte";

  type TechnologyType = "db" | "hosting" | "programming" | "tool";

  export let name: string;
  export let href = "";
  export let type: TechnologyType;

  const icons: Record<TechnologyType, typeof Cloud> = {
    db: Database,
    hosting: Cloud,
    programming: Code,
    tool: Hammer,
  };
</script>

{#if href}
  <a class="flex items-center gap-2 text-white hover:text-red-500 transition-colors duration-300" {href} target="_blank">
    <svelte:component this={icons[type]} size={20} />
    <span class="underline underline-offset-6">
      {name}
    </span>
  </a>
  {:else}
  <span class="flex items-center gap-2 text-white">
    <svelte:component this={icons[type]} size={20} />
    <span>
      {name}
    </span>
  </span>
{/if}