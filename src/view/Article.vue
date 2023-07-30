<script setup lang="ts">
import { computed, ref } from "vue";
import { API } from "../api/index";
import { useAsyncState } from "@vueuse/core";
import SearchBox from "../components/SearchBox.vue";

const searchInput = ref("");
const { state, isLoading, execute } = useAsyncState(
  () => API.getArticleSearch({ searchText: searchInput.value }),
  null
);
const resultChains = computed(() => {
  const data = state.value ?? [];
  return data;
});
const handleSearch = () => {
  if (isLoading.value === false) execute();
  console.log(searchInput.value);
};
</script>

<template>
  <section>
    <h1 class="pb-4 text-4xl">掘金文章搜索</h1>

    <SearchBox v-model="searchInput" @search="handleSearch"></SearchBox>

    <ul
      v-if="state && resultChains"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left"
    >
      <a
        :href="'https://juejin.cn/post/' + data.article_id"
        target="_blank"
        v-for="data in resultChains"
        class="bg-gray-50 transition-all text-black p-2 rounded-lg cursor-pointer"
      >
        <h3 class="font-bold">
          {{ data.title }}
          <span class="float-right">{{ data.original_author }}</span>
        </h3>

        <p class="text-sm font-thin py-2">
          {{ data.brief_content }}
        </p>
        <div>
          👀 {{ data.view_count }} ⭐{{ data.collect_count }} 💬{{
            data.comment_count
          }}
          ✍️{{ new Date(data.mtime).toLocaleDateString() }}
        </div>
      </a>
    </ul>
    <div v-if="isLoading" class="flex-1">加载数据中</div>
  </section>
</template>

<style scoped></style>
