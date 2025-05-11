<script>
  import { APP_URL } from '$lib';
	import { DateFormatter } from '$lib';

	export let data;
</script>

<svelte:head>
  <title>Blog</title>
  <meta name="description" content="Shawn Lee's personal blog." />
  <meta name="author" content="Shawn Lee" />
  <meta property="og:title" content="Blog" />
  <meta property="og:site_name" content="Shawn Lee's Blog" />
  <meta property="og:description" content="Shawn Lee's personal blog." />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="{APP_URL}/blog" />
  <meta property="og:locale" content="en_US" />
</svelte:head>

<header>
	<h1 class="mb-4 text-4xl text-white font-medium">Blog</h1>
</header>
<div class="grid gap-4">
	{#each data.postList as post (post.slug)}
		{@const date = new Date(post.date)}
		<article class="flex flex-col gap-2">
			<a class="link underline underline-offset-4" href="/blog/{post.slug}">
				<h2 class="text-2xl font-medium">
					{post.title}
				</h2>
			</a>
			<time class="opacity-50" datetime={date.toISOString()}>
				{DateFormatter.format(date)}
			</time>
		</article>
	{/each}
</div>
