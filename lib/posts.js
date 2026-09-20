// In-memory store only — no database, resets whenever the server restarts.
const store = globalThis.__boardStore ?? (globalThis.__boardStore = { posts: [], nextId: 1 });

export function getPosts() {
  return [...store.posts];
}

export function addPost({ title, content }) {
  const post = {
    id: store.nextId++,
    title,
    content,
    author: "익명",
    createdAt: new Date().toISOString(),
  };
  store.posts.unshift(post);
  return post;
}
