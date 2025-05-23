import PostDAO from "$lib/db/PostDAO";

export async function load() {
  return { postList: PostDAO.getAll() };
}