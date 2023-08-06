<script setup lang="ts">
import { computed } from "vue";
import { API } from "../api/index";
import { useAsyncState } from "@vueuse/core";

const { state, isLoading } = useAsyncState(API.getTagList(), null);

const resultChains = computed(() => {
  const data = state.value ?? [];
  return [...data].sort((a, b) => {
    return b.post_article_count - a.post_article_count;
  });
});
</script>

<template>
  <section>
    <h1 class="pb-8 text-center">掘金标签搜索页面</h1>

    <ul v-if="state && resultChains" class="flex flex-wrap gap-4">
      <li
        v-for="data in resultChains"
        class="bg-green-600 text-white p-2 text-sm rounded-lg cursor-pointer"
        :style="{
          backgroundColor: data.color,
        }"
      >
        <router-link :to="{ query: { tag_id: data.tag_id }, path: '/articles' }">
          {{ data.tag_name }}
          <sup>
            {{ data.post_article_count }}
          </sup>
        </router-link>
      </li>
    </ul>
    <div v-if="isLoading">加载数据中</div>
  </section>
</template>

<style scoped></style>
