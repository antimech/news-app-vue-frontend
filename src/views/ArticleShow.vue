<script setup>
import { onMounted, ref } from 'vue'
import { DateTime } from 'luxon'

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const article = ref({})

onMounted(async () => {
  await fetch('http://localhost:8000/api/articles/' + props.id)
      .then(response => response.json())
      .then(data => article.value = data.data)
})
</script>

<template>
  <article>
    <h1>{{ article.title }}</h1>

    <div class="img-wrapper">
      <img :src="article.image_url" alt="">
    </div>

    <p>
      {{ article.content }}
    </p>

    <div class="article-footer">
      <div class="date">
        Published at: {{ DateTime.fromISO(article.created_at)}}
      </div>
    </div>
  </article>
</template>

<style scoped>
h1 {
  text-align: center;
}

.img-wrapper {
  text-align: center;
}

.img-wrapper img {
  max-width: 100%;
}

.article-footer {
  margin-top: 1rem;
}

@media (min-width: 768px) {
  .article-footer {
    display: flex;
    justify-content: space-between;
  }
}
</style>
