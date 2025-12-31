import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [],
  templateUrl: './tic-tac-toe.html',
  styleUrl: './tic-tac-toe.scss',
})
export class TicTacToe {
  board = signal<(string | null)[]>(Array(9).fill(null));
  turn = signal<'X' | 'O'>('X');
  player = signal<number>(1);
  winner = signal<string | null>(null);
  winningCells = signal<number[]>([]);
  readonly winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  play(index: number): void {
    if (this.board()[index] || this.winner()) return;
    this.board.update((oldBoard) => {
      const updatedBoard = [...oldBoard];
      updatedBoard[index] = this.turn();
      console.log(updatedBoard);
      return updatedBoard;
    });
  }
}
