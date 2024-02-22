<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref()
const password = ref()

async function submit() {
  await axios.get('/sanctum/csrf-cookie')

  await axios.post('/login', {
    email: email.value,
    password: password.value
  })

  const { data } = await axios.get('/api/user')

  alert(`Welcome, ${data.name}!`)
}
</script>

<template>
  <main>
    <h1>Login</h1>

    <form @submit.prevent="submit">
      <div>
        <label for="email">Email</label>

        <div>
          <input type="text" id="email" v-model="email" required>
        </div>
      </div>

      <div>
        <label for="password">Password</label>

        <div>
          <input type="password" id="password" v-model="password" required>
        </div>
      </div>

      <button>Login</button>
    </form>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
