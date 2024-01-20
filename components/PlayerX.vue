<script setup lang="ts">
defineProps<{
  player: string;
}>();

const emits = defineEmits<{
  (e: 'selectPlayer'): void;
}>();
</script>

<template>
  <button
    class="w-full py-3 transition-colors duration-500 rounded-xl"
    :class="
      player === 'X'
        ? 'text-deep-abyss-blue'
        : 'text-serene-blue hover:bg-deep-charcoal'
    "
    @click="emits('selectPlayer')"
  >
    <Icon name="fa:close" class="relative mx-auto cursor-default" size="32" />
  </button>
</template>
