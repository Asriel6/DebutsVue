<script setup>
import { computed, ref } from "vue";

const text = ref("Tonk");
const trimmedtext = computed(() => text.value.trim());
const posts = ref([]);

function addPost() {
  const newPost = {
    id: Math.random().toString(36).substring(2),
    content: trimmedtext.value,
    createdAt: new Date(),
    author: {
      id: Math.random().toString(36).substring(2),
      username: "Asriel",
      avatarUrl: "https://i.pinimg.com/736x/fd/7a/31/fd7a317b61c79bbe72935d1920b0698c.jpg",
    },
  };
  posts.value.push(newPost);
  text.value = "";
}
</script>

<template>
  <main>
    <div class="container">
      <form class="card" @submit.prevent="addPost">
        <!--v-model lie la variable text avec l'input et l'actualise en direct-->
        <textarea
          name="post"
          id="post"
          placeholder="Quoi de neuf ?"
          maxlength="200"
          v-model="text"
        ></textarea>
        <button type="submit" :disabled="!trimmedtext.length">Publier</button>
      </form>

      <p v-if="!posts.length">Pas de posts pour le moment...</p>

      <article v-for="(post, index) in posts" :key="index" class="card">
        <div class="post-header">
          <img
            :src="post.author.avatarUrl"
            alt="avatar"
            width="36"
            height="36"
            class="user-image"
          />
          <a>{{ post.author.username }}</a>
        </div>
        <p>{{ post.content }}</p>
      </article>
    </div>
  </main>
</template>

<style scoped>
.container {
  height: 100vh;
  margin: 0 auto;
  max-width: 640px;
}
.card {
  background-color: var(--color-bg-secondary);
  border-radius: 10px;
  border: 1px solid var(--color-border);
  margin-bottom: 1rem;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  padding: 1rem 1.5rem;
  width: 100%;
}
textarea {
  background: none;
  border: none;
  color: var(--color-text-primary);
  flex: 1;
  margin-bottom: 1rem;
  outline: none;
  padding: 0.5rem 0;
  resize: none;
  field-sizing: content;
}
button {
  align-self: flex-end;
  background: none;
  border-radius: 10px;
  border: 1px solid var(--color-border);
  color: var(--color-text-primary);
  cursor: pointer;
  font-size: 1rem;
  height: 40px;
  padding: 0 1rem;
}
article {
  padding: 0.75rem 1.5rem;
  overflow: hidden;
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}
article p {
  white-space: pre-warp;
}
.user-image {
  border-radius: 50%;
  object-fit: cover;
}
.post-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}
</style>
