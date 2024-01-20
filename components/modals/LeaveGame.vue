<script setup lang="ts">
const emits = defineEmits<{
  (e: 'closeModal'): void;
}>();
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex items-center bg-just-black/50"
  >
    <div
      class="flex flex-col gap-y-4 text-center py-10 bg-midnight-slate w-full"
    >
      <h4 class="text-2xl font-bold uppercase text-serene-blue">
        Exit the game?
      </h4>
      <div class="flex gap-x-4 justify-center">
        <NuxtLink
          to="/"
          class="flex items-center bg-tranquil-slate-blue hover:bg-ice-blue px-10 h-[55px] font-bold pb-1 text-deep-abyss-blue uppercase rounded-lg shadow-[0_-4px_0_0_#6b8997_inset] tracking-widest"
        >
          Quit
        </NuxtLink>
        <button
          class="bg-goldenrod hover:bg-sunlit-apricot shadow-[0_-4px_0_0_#cc8b15_inset] px-14 pb-1 rounded-lg uppercase text-deep-abyss-blue font-bold tracking-widest"
          @click="emits('closeModal')"
        >
          Continue
        </button>
      </div>
    </div>
  </div>
</template>
