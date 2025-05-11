import PostDAO from '$lib/db/PostDAO'; 

export async function load(event) {
  return { post: await PostDAO.getOne(event.params.slug) };
}