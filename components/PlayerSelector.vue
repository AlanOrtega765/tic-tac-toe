<script setup lang="ts">
defineProps<{
  player: string;
  iconName: string;
}>();

const emits = defineEmits<{
  (e: 'choosePlayer'): void;
}>();
</script>

<template>
  <button
    class="w-full py-3 transition-colors duration-500 rounded-xl"
    :class="{
      'text-deep-abyss-blue': player === 'X' || player === 'O',
      'text-serene-blue hover:bg-deep-charcoal': player !== 'X' && player !== 'O',
    }"
    @click="emits('choosePlayer')"
  >
    <Icon :name="iconName" class="relative mx-auto cursor-default" size="32" />
  </button>
</template>