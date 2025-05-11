<script>
	import { Technology } from "$lib/components";

	const APP_SITE_NAME = "Shawn Lee - Software Engineer";
	const APP_URL = "https://lee-shawn-land.vercel.com";
</script>

<svelte:head>
	<title>{APP_SITE_NAME}</title>
	<meta name="description" content="Shawn Lee's personal website. Software Engineer." />
	<meta
		name="keywords"
		content="Shawn Lee, Software Engineer, Web Developer, Programming, Technology, Open Source"
	/>
	<meta name="author" content="Shawn Lee" />
	<meta property="og:title" content={APP_SITE_NAME} />
	<meta property="og:site_name" content={APP_SITE_NAME} />
	<meta property="og:description" content="Shawn Lee's personal website. Software Engineer." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content={APP_URL} />
	<meta property="og:locale" content="en_US" />
	<!-- TODO: <meta property="og:image" content="https://yourwebsite.com/og-image.jpg" /> -->
	<!-- TODO: <meta name="twitter:card" content="summary_large_image" /> -->
	<!-- TODO: <meta name="twitter:title" content="Shawn Lee - Software Engineer" /> -->
	<!-- TODO: <meta name="twitter:description" content="Shawn Lee's personal website. Software Engineer." /> -->
	<!-- TODO: <meta name="twitter:image" content="https://yourwebsite.com/twitter-image.jpg" /> -->
</svelte:head>

<main class="w-full max-w-2xl py-12 px-4 mx-auto md:py-24">
	<div class="grid gap-8">
		<header>
			<h1 class="mb-4 text-4xl text-white font-medium">Shawn Lee</h1>
			<h2 class="mt-2 text-xl font-medium text-white">Software Engineer Undegraduate</h2>
			<p class="mt-2">
				Based on <strong class="font-medium text-white">Mexico</strong> and studying at
				<strong class="font-medium text-white">Universidad Veracruzana</strong>.
			</p>
		</header>
		<section class="grid gap-4">
			<h2 class="sr-only">Technologies</h2>
			<div class="flex flex-wrap items-center gap-8">
				<Technology name="C++" type="programming"/>
				<Technology name="Java" type="programming"/>
				<Technology name="JavaScript" type="programming"/>
				<Technology name="Svelte" type="programming" href="https://svelte.dev"/>
				<Technology name="SvelteKit" type="programming" href="https://svelte.dev" />
				<Technology name="TypeScript" type="programming" href="https://typescriptlang.org"/>
				<Technology name="Figma" type="tool" href="https://figma.com" />
				<Technology name="MySQL" type="db" />
				<Technology name="PostgreSQL" type="db" />
				<Technology name="Supabase" type="db" href="https://supabase.com" />
				<Technology name="GelDB" type="db" href="https://geldata.com" />
				<Technology name="Vercel" type="hosting" href="https://vercel.com" />
			</div>
		</section>
		<section class="grid gap-4 leading-9">
			<h2 class="sr-only">About Me</h2>
			<p>
				I am a software engineer with a passion for building web applications. I have experience in
				various programming languages and frameworks, and I enjoy learning new technologies. In my
				free time, I like to work on personal projects.
			</p>
			<p>
        I enjoy learning about the Roman Empire and its history. I find it fascinating how they
        managed to build such a vast empire and how their culture and influence still impact us
        today. I also love to read about the history of the world and how it has shaped our
        present. I believe that understanding history is essential to understanding our world and
        the people in it.
			</p>
      <p>
        I am also a fan of dark, futuristic aesthetics. I love the combination of dark colors and sleek designs that create a
        mysterious and intriguing atmosphere. I find it inspiring and motivating to work in an
        environment that reflects my personal style and interests. I believe that our surroundings
        can greatly influence our creativity and productivity, and I strive to create a workspace
        that inspires me to do my best work.
      </p>
		</section>
		<section class="flex items-center gap-8">
			<h2 class="sr-only">Contact</h2>
			<a
				class="flex items-center gap-2 text-white hover:text-red-500 transition-colors duration-300"
				target="_blank"
				href="https://github.com/OGShawnLee"
			>
				<i class="bx bxl-github text-lg"></i>
				GitHub
			</a>
		</section>
	</div>
</main>
