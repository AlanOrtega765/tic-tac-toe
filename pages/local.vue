<script setup lang="ts">
import type { PlayerType, Square } from '~/types';

const savedSquares = localStorage.getItem('squares') as string;
const savedScores = localStorage.getItem('scores') as string;
const savedTurn = localStorage.getItem('last-turn') as PlayerType;

const player = ref<PlayerType>(localStorage.getItem('player') as PlayerType);
const turn = ref<PlayerType>(JSON.parse(savedTurn) || 'X');
const winningLine = ref<number[]>([]);
const winningPlayer = ref<PlayerType | null>(null);

const squares = ref<Square[]>(
  JSON.parse(savedSquares) ||
    Array.from({ length: 9 }, (_, id) => ({
      id: id + 1,
      player: null,
      selected: false,
    }))
);

const squareRefs = ref<Array<HTMLElement | null>>([]);
const scores = ref(JSON.parse(savedScores) || { playerOne: 0, ties: 0, playerTwo: 0 });
const isOpenFinishGameModal = ref(false);
const isOpenLeaveGameModal = ref(false);
const isOpenRestartGameModal = ref(false);

const isPlayerX = computed(() => player.value === 'X');
const isPlayerO = computed(() => player.value === 'O');

const winningCombinations = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];

const checkWinner = () => {
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (
      squares.value[a - 1].player === squares.value[b - 1].player &&
      squares.value[a - 1].player === squares.value[c - 1].player &&
      squares.value[a - 1].player !== null
    ) {
      return { player: squares.value[a - 1].player, line: combination };
    }
  }

  return null;
};

const checkTie = () =>
  squares.value.every((square) => square.selected) && !checkWinner();

const openModal = () => {
  saveScores();
  setTimeout(() => {
    isOpenFinishGameModal.value = true;
  }, 1000);
};

const saveMoves = () => {
  localStorage.setItem('squares', JSON.stringify(squares.value));
  localStorage.setItem('last-turn', JSON.stringify(turn.value));
};

const saveScores = () => {
  localStorage.setItem(
    'scores',
    JSON.stringify({
      playerOne: scores.value.playerOne,
      ties: scores.value.ties,
      playerTwo: scores.value.playerTwo,
    })
  );
};

const handleClick = (square: Square) => {
  if (square.selected || checkWinner()) {
    return;
  }

  square.player = turn.value;
  square.selected = true;

  let winner = checkWinner();
  if (winner) {
    winningPlayer.value = winner.player;
    winningLine.value = winner.line;

    winner.player === player.value
      ? scores.value.playerOne++
      : scores.value.playerTwo++;

    saveScores();
    openModal();
    return;
  }

  if (checkTie()) {
    scores.value.ties++;
    openModal();
    return;
  }

  turn.value = turn.value === 'X' ? 'O' : 'X';
  saveMoves();
};

const isWinningSquare = (index: number) => winningLine.value.includes(index);

const restartGame = () => {
  localStorage.removeItem('squares');
  localStorage.removeItem('last-turn');
  winningPlayer.value = null;
  turn.value = 'X';
  winningLine.value = [];
  squares.value = Array.from({ length: 9 }, (_, id) => ({
    id: id + 1,
    player: null,
    selected: false,
  }));

  if (player.value === 'O') turn.value = 'X';
};

onBeforeRouteLeave(() => {
  localStorage.removeItem('squares');
  localStorage.removeItem('scores');
  localStorage.removeItem('last-turn');
});
</script>

<template>
  <div class="grid gap-y-5 w-[460px]">
    <div class="grid grid-cols-3 h-[52px]">
      <button class="flex items-center" @click="isOpenLeaveGameModal = true">
        <img src="/img/logo.svg" />
      </button>
      <div
        class="flex items-center justify-center gap-x-2 text-serene-blue pb-1 bg-midnight-slate h-full rounded-lg shadow-[0_-4px_0_0_#10212a_inset]"
      >
        <Icon
          :name="turn === 'X' ? 'fa:close' : 'fa6-solid:circle-dot'"
          size="18"
        />
        <span class="uppercase font-bold">Turn</span>
      </div>
      <button
        class="relative bg-tranquil-slate-blue hover:bg-ice-blue h-full w-[52px] rounded-lg pb-1 shadow-[0_-4px_0_0_#6b8997_inset] place-self-end"
        type="button"
        @click="isOpenRestartGameModal = true"
      >
        <Icon
          class="text-deep-charcoal"
          name="material-symbols:refresh-rounded"
          size="30"
        />
      </button>
    </div>

    <div class="grid grid-cols-3 gap-5">
      <button
        ref="squareRefs"
        v-for="square in squares"
        :key="square.id"
        class="flex items-center justify-center gap-x-2 text-serene-blue pb-2 aspect-square rounded-xl shadow-[0_-8px_0_0_#10212a_inset] group"
        :class="
          isWinningSquare(square.id)
            ? winningPlayer === 'X'
              ? 'bg-teal-green'
              : 'bg-goldenrod'
            : 'bg-midnight-slate'
        "
        @click="handleClick(square)"
      >
        <Icon
          v-if="square.player === 'X'"
          :class="
            isWinningSquare(square.id)
              ? 'text-midnight-slate'
              : 'text-teal-green'
          "
          name="fa:close"
          size="64"
        />
        <IconsXMarkOutline
          v-if="turn === 'X' && !square.selected"
          class="opacity-0 group-hover:opacity-100 h-16 text-white text-teal-green"
        />
        <Icon
          v-if="square.player === 'O'"
          :class="
            isWinningSquare(square.id)
              ? 'text-midnight-slate'
              : 'text-goldenrod'
          "
          name="fa6-solid:circle-dot"
          size="64"
        />
        <IconsCircleOutline
          v-if="turn === 'O' && !square.selected"
          class="opacity-0 group-hover:opacity-100 h-16 text-white text-goldenrod"
        />
      </button>
    </div>

    <div class="grid grid-cols-3 gap-x-5">
      <div class="text-center bg-teal-green rounded-xl py-2">
        <h6 class="uppercase text-xs font-medium">
          {{ isPlayerX ? 'X (P1)' : 'X (P2)' }}
        </h6>
        <span class="text-2xl font-bold">{{
          isPlayerX ? scores.playerOne : scores.playerTwo
        }}</span>
      </div>
      <div class="text-center bg-serene-blue rounded-xl py-2">
        <h6 class="uppercase text-xs font-medium">Ties</h6>
        <span class="text-2xl font-bold">{{ scores.ties }}</span>
      </div>
      <div class="text-center bg-goldenrod rounded-xl py-2">
        <h6 class="uppercase text-xs font-medium">
          {{ isPlayerO ? 'O (P1)' : 'O (P2)' }}
        </h6>
        <span class="text-2xl font-bold">{{
          isPlayerO ? scores.playerOne : scores.playerTwo
        }}</span>
      </div>
    </div>

    <ModalsFinishLocalGame
      v-if="isOpenFinishGameModal"
      :player="player"
      :winning-player="winningPlayer"
      @close-modal="isOpenFinishGameModal = false"
      @restart-game="restartGame"
    />
    <ModalsLeaveGame
      v-if="isOpenLeaveGameModal"
      @close-modal="isOpenLeaveGameModal = false"
    />
    <ModalsRestartGame
      v-if="isOpenRestartGameModal"
      @close-modal="isOpenRestartGameModal = false"
      @restart-game="restartGame"
    />
  </div>
</template>
