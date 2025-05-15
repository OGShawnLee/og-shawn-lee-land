<script>
  import { APP_SITE_NAME, APP_URL, DateFormatter } from '$lib';

  export let data;

  const date = new Date(data.post.date);
</script>

<svelte:head>
	<title>{data.post.title}</title>
  <meta name="description" content={data.post.description} />
  <meta name="author" content="Shawn Lee" />

  <!-- Open Graph Meta Tags -->
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.post.title} />
  <meta property="og:description" content={data.post.description} />
  <meta property="og:url" content="{APP_URL}/{data.post.slug}" />
  <meta property="og:site_name" content={APP_SITE_NAME} />
  <meta property="og:locale" content="en_US" />
  <meta property="article:published_time" content={date.toISOString()} />
  <meta property="article:author" content="Shawn Lee" />
</svelte:head>

<div class="contents" id="article-blog">
  <hgroup>
    <h1 class="mb-4 text-4xl text-white font-medium">{data.post.title}</h1>
    <time class="opacity-50" datetime={date.toISOString()}>
      {DateFormatter.format(date)}
    </time>
  </hgroup>
  <div class="grid gap-4 leading-9" id="content">
    <data.post.content />
  </div>
</div>

<style>
  #content {
    :global(blockquote) {
      --uno: "relative py-2 lt-sm:(border-l-6 border-stone-900 px-4) sm:after:(content-[''] absolute inset-y-0 w-1.5 -left-8 bg-stone-900)";
    }

    :global(h1, h2, h3) {
      --uno: "text-white";
    }

    :global(h2) {
      --uno: "text-3xl font-medium";
    }

    :global(h3) {
      --uno: "text-2xl font-medium";
    }

    :global(h2) {
      --uno: "text-3xl font-medium";
    }

    :global(ol) {
      --uno: "list-decimal list-inside pl-4";
    }

    :global(a) {
      --uno: "link underline underline-offset-4"
    }

    :global(em) {
      --uno: "text-lg font-britney"
    }

    :global(strong) {
      --uno: "text-white font-medium";
    }

    :global(pre) {
      --uno: "p-6 border-2 border-stone-900/65 text-sm leading-relaxed";
    }

    :global(code) {
      --uno: "font-jm text-sm";
    }

    :global(.highlighted) {
      width: calc(100% + 48px);
		  --uno: "-mx-6 px-6 py-0.75 inline-block bg-stone-900/65";
	  }

    :global(.line-add) {
      width: calc(100% + 48px);
		  --uno: "-mx-6 px-6 relative py-0.75 inline-block bg-green-950/35 after:(content-['+'] absolute left-2.25 text-green-500 font-medium)";
	  }
    
    :global(.line-remove) {
      width: calc(100% + 48px);
		  --uno: "-mx-6 px-6 relative py-0.75 inline-block bg-red-950/35 after:(content-['-'] absolute left-2.25 text-red-500 font-medium)";
	  }

    :global(.error) {
      width: calc(100% + 48px);
      --uno: "-mx-6 px-6 relative py-0.75 inline-block !bg-red-950/35 after:(content-['!'] absolute left-2.25 text-red-500 font-medium)";
    }
  }
</style>