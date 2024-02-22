<script setup>
import { ref } from 'vue'
import axios from 'axios'

const email = ref()
const password = ref()
const errors = ref([])

async function submit() {
  await axios.get('/sanctum/csrf-cookie')

  try {
    await axios.post('/login', {
      email: email.value,
      password: password.value
    })
  } catch (error) {
    if (error.response.status === 422) {
      errors.value = error.response.data.errors

      return
    }
  }

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

        <div
          class="invalid-feedback"
          v-if="errors['email']"
      >
        {{ errors['email'][0] }}
      </div>
      </div>

      <div>
        <label for="password">Password</label>

        <div>
          <input type="password" id="password" v-model="password" required>
        </div>

        <div
          class="invalid-feedback"
          v-if="errors['password']"
      >
        {{ errors['password'][0] }}
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

.invalid-feedback {
  color: red;
}
</style>
