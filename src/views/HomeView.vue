<script setup>
import { onMounted, ref } from 'vue'
import { DateTime } from 'luxon'

const articles = ref([])

onMounted(async () => {
  await fetch('http://localhost:8000/api/articles')
      .then(response => response.json())
      .then(data => articles.value = data.data)
})
</script>

<template>
  <main>
    <div class="items">
      <router-link :to="{name: 'article.show', params: {id: article.id}}" class="item" v-for="article in articles">
        <div class="date-wrapper">
          <img :src="article.image_url" alt="">
          <div class="date" :title="article.created_at">{{ DateTime.fromISO(article.created_at).toRelative() }}</div>
        </div>

        <p class="bold">{{ article.title }}</p>

        <p>{{ article.content.slice(0, 64) + '...' }}</p>
      </router-link>
    </div>
  </main>
</template>

<style scoped>
.items {
  display: grid;
  gap: 1rem;
}

@media (min-width: 768px) {
  .items {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .items {
    grid-template-columns: repeat(3, 1fr);
  }
}

.item {
  border: 1px solid var(--color-border);
  padding: 8px;
  text-align: center;
}

.date-wrapper {
  position: relative;
  margin: 0 auto;
  width: fit-content;
}

.date-wrapper img {
  max-width: 100%;
}

.date {
  position: absolute;
  top: 5px;
  right: 5px;
}

.bold {
  font-weight: bold;
}
</style>
