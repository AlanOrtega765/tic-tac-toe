export type PlayerType = 'X' | 'O';

export interface Square {
  id: number;
  player: PlayerType | null;
  selected: boolean;
}
