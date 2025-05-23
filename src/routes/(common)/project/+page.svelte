<script>
	import { APP_SITE_NAME, APP_URL } from '$lib';
	import { Project } from '$lib/components';
</script>

<svelte:head>
	<title>Project</title>
	<meta name="description" content="Shawn Lee's projects." />
	<meta name="author" content="Shawn Lee" />
	<meta property="og:title" content="Project" />
	<meta property="og:site_name" content={APP_SITE_NAME} />
	<meta property="og:description" content="Shawn Lee's projects." />
	<meta property="og:type" content="website" />
	<meta property="og:url" content="{APP_URL}/project" />
	<meta property="og:locale" content="en_US" />
</svelte:head>

<hgroup>
	<h1 class="mb-4 text-4xl text-white font-medium">Project</h1>
	<p>Check out some of the things I've built over the years.</p>
</hgroup>
<div class="grid gap-12">
	<Project.Section title="Website">
		<Project.Card
			title="Veracruz Inclusivo"
			repository="OGShawnLee/veracruz-inclusivo"
			website="https://veracruz-inclusivo.vercel.app"
		>
			Veracruz Inclusivo is your bridge to companies and organizations that truly believe in
			everyone's talent. Find the service you need or the job opportunity you deserve. Building a
			more just and equitable Veracruz together.
		</Project.Card>
	</Project.Section>
	<Project.Section title="Programming Language">
		<Project.Card title="Pino" repository="OGShawnLee/pino-lang">
			Simple and aesthetic programming language built with C++ that intends to turn programming a
			joyful experience. Currently transpiled to JavaScript/Python as I don't know how to compile to
			a lower level.
		</Project.Card>
	</Project.Section>
	<Project.Section title="Application">
		<Project.Card title="Project PCS" repository="OGShawnLee/project-pcs">
			Internship Management System Project built in Java and JavaFX for the university course of
			Principles of Software Construction.
		</Project.Card>
	</Project.Section>
</div>
