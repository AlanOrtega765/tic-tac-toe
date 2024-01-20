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
      player === 'O'
        ? 'text-deep-abyss-blue'
        : 'text-serene-blue hover:bg-deep-charcoal'
    "
    @click="emits('selectPlayer')"
  >
    <Icon
      class="relative mx-auto cursor-default"
      name="fa6-solid:circle-dot"
      size="32"
    />
  </button>
</template>
