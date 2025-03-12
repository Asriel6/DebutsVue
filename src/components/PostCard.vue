<script setup>
import { TrashIcon, HeartIcon } from "@heroicons/vue/24/outline";
import { HeartIcon as SolidHeartIcon } from "@heroicons/vue/24/solid";
defineProps(["post"]);
const emit = defineEmits(["delete", "like"]);
</script>
<template>
  <article class="card">
    <div class="post-header">
      <header>
        <img :src="post.author.avatarUrl" alt="avatar" width="36" height="36" class="avatar" />
        <routerLink :to="{name: 'user', params: {username: post.author.username}}">{{ post.author.username }}</routerLink>
      </header>
    </div>
    <p>{{ post.content }}</p>
    <p>
      <i>{{ post.createdAt }}</i>
    </p>
    <footer>
      <button class="btn-icon" @click="emit('delete', post.id)">
        <TrashIcon />
      </button>
      <button class="btn-icon" @click="emit('like', post.id)">
        <HeartIcon v-if="!post.liked" />
        <SolidHeartIcon v-if="post.liked" />
      </button>
    </footer>
  </article>
</template>
