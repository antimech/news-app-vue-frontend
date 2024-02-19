<script setup>
import { onMounted, ref } from 'vue'
import { DateTime } from 'luxon'
import axios from "axios";

const props = defineProps({
  id: {
    type: Number,
    required: true
  }
})

const article = ref({
  author: {}
})

onMounted(async () => {
  const { data } = await axios.get('/api/articles/' + props.id)

  article.value = data.data
})
</script>

<template>
  <article>
    <h1>{{ article.title }}</h1>

    <div class="img-wrapper">
      <img :src="article.image_url" alt="">
    </div>

    <div class="content">
      <p>
        {{ article.content }}
      </p>

      <div class="article-footer">
        <div>
          Author: {{ article.author.name }}
        </div>
        <div class="date">
          Published at: {{ DateTime.fromISO(article.created_at)}}
        </div>
      </div>
    </div>

    <div>
      Views: {{ article.views }}
    </div>
  </article>
</template>

<style scoped>
@media (min-width: 425px) {
  article .content {
    border: 1px solid #808080;
    padding: .5rem;
  }
}

@media (min-width: 768px) {
  article .content {
    padding: .25rem .75rem;
  }
}

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
