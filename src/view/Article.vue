<script setup lang="ts">
import { computed, ref } from "vue";
import { API } from "../api/index";
import { useAsyncState } from "@vueuse/core";
import SearchBox from "../components/SearchBox.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const searchInput = ref("");
const { state: TagsList, isReady: TagsReady } = useAsyncState(() => API.getTagList(), []);

const tagMap = computed(() => {
  if (TagsReady.value) {
    return TagsList.value.reduce((col, cur) => {
      col[cur.tag_id.slice(0, cur.tag_id.length - 3)] = cur.tag_name;
      return col;
    }, {} as Record<string, string>);
  } else {
    return {};
  }
});

const selectedTag = computed(() => {
  return TagsList.value.filter((i) => i.tag_id === route.query.tag_id);
});
const { state, isLoading, execute } = useAsyncState(
  () =>
    API.getArticleSearch({
      searchText: searchInput.value,
      ...route.query,
    }),
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
  <main class="max-w-4xl m-auto relative">
    <header class="flex sticky top-0 left-0 bg-white items-center">
      <h2 class="flex-1 font-bold text-2xl">掘金文章搜索</h2>

      <SearchBox v-model="searchInput" @search="handleSearch"></SearchBox>
    </header>

    <div>
      <div>
        <span v-for="tag in selectedTag">{{ tag.tag_name }} </span>
      </div>
    </div>
    <div
      v-if="state && resultChains"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left py-8"
    >
      <a
        :href="'https://juejin.cn/post/' + data.article_id"
        target="_blank"
        v-for="data in resultChains"
        class="bg-gray-50 flex flex-col h-full transition-all no-underline text-black p-2 rounded-lg cursor-pointer"
      >
        <h3 class="font-bold">
          {{ data.title }}
          <span class="float-right">{{ data.original_author }}</span>
        </h3>

        <p class="text-sm font-thin py-2 flex-1">
          {{ data.brief_content }}
        </p>
        <div class="text-gray-500">
          👀 {{ data.view_count }} ⭐{{ data.collect_count }} 💬{{
            data.comment_count
          }}
          ✍️{{ new Date(data.mtime).toLocaleDateString() }}
          <ul class="flex gap-2">
            <li class="bg-green-200" v-for="tag in data.tag_ids">
              {{ tagMap[tag.slice(0, tag.length - 3)] }}
            </li>
          </ul>
        </div>
      </a>
    </div>
    <div v-if="isLoading" class="flex-1">加载数据中</div>
  </main>
</template>

<style scoped></style>
