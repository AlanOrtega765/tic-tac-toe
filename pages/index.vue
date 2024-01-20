<script setup lang="ts">
import type { PlayerType } from '~/types';

const player = ref<PlayerType>('X');

const selectPlayer = (value: PlayerType) => (player.value = value);
const savePlayer = () => localStorage.setItem('player', player.value);
</script>

<template>
  <div class="flex flex-col w-full md:w-[450px]">
    <div class="flex items-center justify-center gap-x-2">
      <img src="/img/logo.svg" />
    </div>
    <div
      class="relative px-6 pt-6 pb-8 mt-10 rounded-2xl bg-midnight-slate shadow-[0_-8px_0_0_#10212a_inset]"
    >
      <h1
        class="text-serene-blue font-bold tracking-widest uppercase text-center"
      >
        Pick player 1's mark
      </h1>
      <div class="bg-deep-abyss-blue rounded-2xl mt-6 p-2">
        <div
          class="relative grid grid-cols-2 w-full before:content-[''] before:absolute before:top-0 before:left-0 before:w-1/2 before:h-full before:bg-serene-blue before:rounded-xl before:transition-transform before:duration-500"
          :class="
            player === 'X' ? 'before:translate-x-0' : 'before:translate-x-full'
          "
        >
          <PlayerX :player="player" @select-player="selectPlayer('X')" />
          <PlayerO :player="player" @select-player="selectPlayer('O')" />
        </div>
      </div>
      <h2
        class="text-serene-blue/50 tracking-widest uppercase text-center text-sm font-medium mt-6"
      >
        Remember : x goes first
      </h2>
    </div>
    <div class="flex flex-col gap-y-4 mt-10">
      <NewGameButton
        :text="'New Game (VS Cpu)'"
        :custom-class="'bg-goldenrod hover:bg-sunlit-apricot shadow-[0_-8px_0_0_#cc8b15_inset]'"
        :path="'/cpu'"
        @click="savePlayer"
      />
      <NewGameButton
        :text="'New Game (VS Player)'"
        :custom-class="'bg-teal-green hover:bg-fresh-turquoise shadow-[0_-8px_0_0_#118c87_inset]'"
        :path="'/local'"
        @click="savePlayer"
      />
    </div>
  </div>
</template>
