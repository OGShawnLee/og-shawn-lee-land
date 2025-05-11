<script lang="ts">
  export let title: string;
</script>

<section class="grid gap-4">
  <h2 class="text-2xl font-medium">{title}</h2>
  <div class="grid gap-4 sm:grid-cols-2">
    <slot />
  </div>
</section>