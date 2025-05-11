<script lang="ts">   
  import IconLink from './IconLink.svelte';
  import { Cloud } from "lucide-svelte";

  export let href: string; 
  export let small = false;
</script>

<IconLink {href} icon={Cloud} label="Site" {small} />
