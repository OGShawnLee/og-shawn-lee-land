<script lang="ts">
  import GitHubLink from "./GitHubLink.svelte"
  import WebsiteLink from "./WebsiteLink.svelte"

  export let title: string;
  export let repository = "";
  export let website = "";
</script>

<article class="grid gap-2">
  <h3 class="text-xl font-medium">{title}</h3>
  <p class="opacity-50 text-sm leading-9">
    <slot />
  </p>
  {#if repository || website}
    <div class="flex gap-8">
      {#if repository}
        <GitHubLink path={repository} />
      {/if}
      {#if website}
        <WebsiteLink href={website} />
      {/if}
    </div>
  {/if}
</article>