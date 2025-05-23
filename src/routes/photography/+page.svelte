<script lang="ts">
  import { APP_URL } from '$lib';
  import { Dialog } from "bits-ui";
  import { fade } from 'svelte/transition';
  import photography from '$lib/photography';

  let choosenPicture = $state("");
  let open = $state(false);

  function handleChoosenPicture(src: string) {
    choosenPicture = src;
    open = true;
  }
</script>

<svelte:head>
  <title>Blog</title>
  <meta name="description" content="Shawn Lee's personal blog." />
  <meta name="author" content="Shawn Lee" />
  <meta property="og:title" content="Blog" />
  <meta property="og:site_name" content="Shawn Lee's Photography" />
  <meta property="og:description" content="Shawn Lee's personal blog." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{APP_URL}/blog" />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<Dialog.Root bind:open>
  <Dialog.Portal>
    <Dialog.Overlay class="fixed inset-0 z-20 bg-black/80" />
    <Dialog.Content class="fixed top-1/2 left-1/2 z-30 w-full h-full -translate-x-1/2 -translate-y-1/2 outline-none">
      <Dialog.Title class="sr-only">Photography</Dialog.Title>
      <img class="max-w-screen max-h-screen object-contain w-full h-full" src={choosenPicture} alt="" on:click={() => open = false}/>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog.Root>

<main class="h-full py-24 md:py-32">
  <div class="grid gap-8">
    <hgroup class="container mx-auto w-full">
      <h1 class="mb-4 text-4xl text-white font-medium">Photography</h1>
    </hgroup>
    <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {#each photography as src (src)}
        <img class="w-full h-full aspect-square object-cover" {src} alt="" on:click={() => handleChoosenPicture(src)} />
      {/each}
    </div>
  </div>
</main>


