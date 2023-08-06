<script setup lang="ts">
import { computed, ref } from "vue";
import { API } from "../api/index";
import { useAsyncState } from "@vueuse/core";
import SearchBox from "../components/SearchBox.vue";

const searchInput = ref("");
const { state, isLoading, execute } = useAsyncState(
  () => API.getUserSearch({ searchText: searchInput.value }),
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
  <main class="max-w-4xl m-auto">
    <header class="flex sticky top-0 left-0 bg-white items-center">
      <h2 class="flex-1 font-bold text-2xl">用户搜索</h2>
      <SearchBox v-model="searchInput" @search="handleSearch"></SearchBox>
    </header>

    <div
      v-if="state && resultChains"
      class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left py-8"
    >
      <router-link
        :to="{
          query: { user_id: data.user_id },
          path: '/articles',
        }"
        v-for="data in resultChains"
        class="bg-gray-50 transition-all no-underline text-black p-4 rounded-lg cursor-pointer"
      >
        <h3 class="grid grid-cols-3">
          <img
            :src="data.avatar_large"
            class="row-start-1 row-end-3 rounded-full h-16 w-16 overflow-hidden"
          />
          <span class="font-bold col-span-2">
            {{ data.user_name }}
          </span>
          <span class="font-thin text-sm col-span-2">{{
            [data.company, data.job_title].join(" ")
          }}</span>
        </h3>

        <p class="text-sm font-thin">
          {{ data.description }}
        </p>
        <div>👀 {{ data.got_view_count }} ⭐{{ data.got_digg_count }}</div>
      </router-link>
    </div>
    <div v-if="isLoading" class="flex-1">加载数据中</div>
  </main>
</template>

<style scoped></style>
