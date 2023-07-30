<template>
  <div class="py-4 flex gap-4">
    <input
      class="py-2 px-4 outline-none rounded-lg bg-gray-100 w-full"
      v-model="model"
      type="text"
      placeholder="请输入搜索关键字"
      @keydown.enter="() => emits('search')"
    />
    <button
      class="bg-red-600 text-white outline-none flex-none"
      @click="() => emits('search')"
    >
      搜索
    </button>
  </div>
</template>

<script setup lang="ts">
import { useVModel } from "@vueuse/core";

const props = defineProps<{
  modelValue: string;
}>();
const emits = defineEmits(["update:modelValue", "search"]);

const model = useVModel(props, "modelValue", emits);
</script>
