<script setup lang="ts">
defineProps<{
  text: string;
  customClass: string;
  path: string;
}>();
</script>

<template>
  <NuxtLink
    class="relative block text-xl uppercase font-bold text-center text-deep-abyss-blue pt-4 pb-[22px] rounded-2xl transition-colors duration-500"
    :class="customClass"
    :to="path"
    >{{ text }}</NuxtLink
  >
</template>
