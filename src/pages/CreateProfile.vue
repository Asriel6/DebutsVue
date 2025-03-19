<script setup>
import router from "@/router";
import { computed, ref } from "vue";
//import { useRouter } from "vue-router";

var mdp = ref("");
var username = ref("");
var email = ref("");

//const router = useRouter();
const trimmedtext = computed(() => mdp.value.trim() && username.value.trim() && email.value.trim());

//const isLoading = ref(false);

function register() {
  /*isLoading.value = true;
  console.log({
    username: username.value,
    email: email.value,
    mdp: mdp.value,
  });
  setTimeout(() => {
    router.push("/");
  }, 1000);*/
  fetch("https://posts-crud-api.vercel.app/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username.value,
      password: mdp.value,
      email: email.value,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      localStorage.setItem("user", JSON.stringify(data))
      router.push("/")
    });
}
</script>

<style scoped>
input {
  background: var(--color-bg-tertiary);
  border: none;
  border-radius: 10px;
  color: var(--color-text-primary);
  outline: none;
  padding: 1rem;
  margin-bottom: 1rem;
}
button {
  width: 100%;
}
</style>

<template>
  <main>
    <h2>Formulaire de Connexion</h2>
    <form class="card" caction="/submit" @submit.prevent="register">
      <div>
        <label for="username">Nom d'utilisateur : </label>
        <input type="text" id="username" name="username" required v-model="username" />
      </div>
      <div>
        <label for="email">Adresse email : </label>
        <input type="email" id="email" name="email" required v-model="email" />
      </div>
      <div>
        <label for="password">Mot de passe : </label>
        <input type="password" id="password" name="password" required v-model="mdp" />
      </div>
      <div>
        <button type="submit" :disabled="!trimmedtext.length">Submit</button>
      </div>
    </form>
  </main>
</template>
