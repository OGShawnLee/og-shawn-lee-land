export type Post = {
	title: string
	slug: string
	description: string
	date: string
}

export default class PostDAO {
  public static getAll() {
    const paths = import.meta.glob('../post/*.md', { eager: true })
    
    let postList: Post[] = []

    for (const path in paths) {
      const file = paths[path]
      console.log(file);
      const slug = path.split('/').at(-1)?.replace('.md', '')
  
      if (file && typeof file === 'object' && 'metadata' in file && slug) {
        const metadata = file.metadata as Omit<Post, 'slug'>
        postList.push({ ...metadata, slug } satisfies Post)
      }
    }
  
    postList = postList.sort((first, second) =>
      new Date(second.date).getTime() - new Date(first.date).getTime()
    )
  
    return postList;
  }

  public static async getOne(slug: string) {
    const data = await import(`../post/${slug}.md`);

    if (data && typeof data === 'object' && 'metadata' in data) {
      const metadata = data.metadata as Omit<Post, 'slug'>
      const content = data.default
      return { ...metadata, slug, content: content as ConstructorOfATypedSvelteComponent };
    }

    throw new Error(`Post with slug ${slug} not found`);
  }
}