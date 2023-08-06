<script setup lang="ts"></script>

<template>
  <header
    class="flex px-8 py-4 shadow-lg shadow-gray-300 justify-between items-center relative z-10"
  >
    <h1 class="text-2xl font-bold">
      <router-link to="/" class="no-underline"> 编程文章聚合 </router-link>
    </h1>

    <div class="float-right">
      <router-link to="/articles"> 文章检索 </router-link>
      <router-link to="/users"> 用户搜索 </router-link>
    </div>
  </header>
  <section class="flex-1 overflow-scroll">
    <router-view />
  </section>
</template>
