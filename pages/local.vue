<script setup lang="ts">
const player = ref(localStorage.getItem('player'));
</script>

<template>
  <div class="grid gap-y-5 w-[460px]">
    <div class="grid grid-cols-3 h-[52px]">
      <NuxtLink to="/" class="flex items-center">
        <img src="/img/logo.svg" />
      </NuxtLink>
      <div
        class="flex items-center justify-center gap-x-2 text-serene-blue pb-1 bg-midnight-slate h-full rounded-lg shadow-[0_-4px_0_0_#10212a_inset]"
      >
        <Icon name="fa:close" size="18" />
        <span class="uppercase font-bold">Turn</span>
      </div>
      <button
        class="relative bg-tranquil-slate-blue hover:bg-ice-blue h-full w-[52px] rounded-lg pb-1 shadow-[0_-4px_0_0_#6b8997_inset] place-self-end"
        type="button"
      >
        <Icon
          class="text-deep-charcoal"
          name="material-symbols:refresh-rounded"
          size="30"
        />
      </button>
    </div>
    <div class="grid grid-cols-3 gap-5">
      <div
        v-for="i in 9"
        :key="i"
        class="flex items-center justify-center gap-x-2 text-serene-blue pb-1 bg-midnight-slate aspect-square rounded-xl shadow-[0_-8px_0_0_#10212a_inset]"
      ></div>
    </div>
    <div class="grid grid-cols-3 gap-x-5">
      <div class="text-center bg-teal-green rounded-xl py-2">
        <h6 class="uppercase text-xs font-medium">X (P1)</h6>
        <span class="text-2xl font-bold">0</span>
      </div>
      <div class="text-center bg-serene-blue rounded-xl py-2">
        <h6 class="uppercase text-xs font-medium">Ties</h6>
        <span class="text-2xl font-bold">0</span>
      </div>
      <div class="text-center bg-goldenrod rounded-xl py-2">
        <h6 class="uppercase text-xs font-medium">O (P2)</h6>
        <span class="text-2xl font-bold">0</span>
      </div>
    </div>
  </div>
</template>
