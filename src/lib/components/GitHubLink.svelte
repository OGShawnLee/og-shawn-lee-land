<script lang="ts">   
  import IconLink from './IconLink.svelte';

  export let path: string; 
  export let small = false;
</script>

<IconLink href="https://github.com/{path}" icon="bxl-github" label="GitHub" {small} />
