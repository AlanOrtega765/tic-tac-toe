<script setup lang="ts">
defineProps<{
  winningPlayer: string | null;
  player: string;
}>();

const emits = defineEmits<{
  (e: 'restartGame'): void;
  (e: 'closeModal'): void;
}>();
</script>

<template>
  <div
    class="absolute top-0 left-0 w-full h-full flex items-center bg-just-black/50"
  >
    <div
      class="flex flex-col text-center py-10 bg-midnight-slate w-full"
    >
      <h4 v-if="winningPlayer" class="text-2xl text-serene-blue font-bold uppercase">
        {{ winningPlayer === player ? 'You Win!' : 'Oh no, you lost...' }}
      </h4>
      <div
        v-if="winningPlayer"
        class="flex items-center justify-center gap-x-6 mt-4"
        :class="winningPlayer === 'X' ? 'text-teal-green' : 'text-goldenrod'"
      >
        <Icon
          :name="winningPlayer === 'X' ? 'fa:close' : 'fa6-solid:circle-dot'"
          size="64"
        />
        <span class="text-2xl font-bold uppercase">Takes the round</span>
      </div>
      <span v-else class="text-2xl font-bold uppercase text-serene-blue"
        >Round Tied</span
      >
      <div class="flex gap-x-4 justify-center mt-10">
        <NuxtLink
          to="/"
          class="flex items-center bg-tranquil-slate-blue hover:bg-ice-blue px-10 h-[55px] font-bold pb-1 text-deep-abyss-blue uppercase rounded-lg shadow-[0_-4px_0_0_#6b8997_inset] tracking-widest"
        >
          Quit
        </NuxtLink>
        <button
          class="bg-goldenrod hover:bg-sunlit-apricot shadow-[0_-4px_0_0_#cc8b15_inset] px-14 pb-1 rounded-lg uppercase text-deep-abyss-blue font-bold tracking-widest"
          @click="emits('restartGame'), emits('closeModal')"
        >
          Next Round
        </button>
      </div>
    </div>
  </div>
</template>
