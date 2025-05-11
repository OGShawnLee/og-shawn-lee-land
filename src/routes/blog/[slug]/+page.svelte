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
  :global(#content) {
    :global(h1) {
      --uno: "text-xl font-medium";
    }
  }
</style>