<script setup>
import { computed, ref } from "vue";
import PostCard from "@/components/PostCard.vue";

const text = ref("Tonk");
const trimmedtext = computed(() => text.value.trim());
const posts = ref([]);

/*function addPost() {
  const newPost = {
    id: Math.random().toString(36).substring(2),
    content: trimmedtext.value,
    createdAt: new Date(),
    author: {
      id: Math.random().toString(36).substring(2),
      username: "Asriel",
      avatarUrl: "https://i.pinimg.com/736x/fd/7a/31/fd7a317b61c79bbe72935d1920b0698c.jpg",
    },
    liked: false,
  };
  posts.value.push(newPost);
  text.value = "";
}*/

function addPost() {
  const token = JSON.parse(localStorage.getItem("user")).token;
  fetch("https://posts-crud-api.vercel.app/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      content: trimmedtext.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data), (text.value = "");
    });
}

function deletePost(postId) {
  posts.value = posts.value.filter((post) => post.id !== postId);
}

function likePost(PostId) {
  for (let i = 0; i < posts.value.length; i++) {
    if (posts.value.at(i).id == PostId) {
      posts.value.at(i).liked = !posts.value.at(i).liked;
      break;
    }
  }
}
const loading = ref(false);
const apiPosts = ref([]);
function fetchPosts() {
  loading.value = true;
  const result = fetch("https://posts-crud-api.vercel.app/posts");
  result
    .then((response) => response.json())
    .then((data) => {
      apiPosts.value = data;
      loading.value = false;
    });
}

fetchPosts();
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
      <p v-if="loading">Chargement...</p>
      <p v-else-if="!posts.length">Pas de posts pour le moment...</p>

      <PostCard
        v-for="(post, index) in apiPosts"
        :key="index"
        :post="post"
        @delete="deletePost"
        @like="likePost"
      />

      <!-- <article v-for="(post, index) in sortedPosts" :key="index" class="card">
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
        <p>
          <i>{{ post.createdAt }}</i>
        </p>
      </article> -->
    </div>
  </main>
</template>
