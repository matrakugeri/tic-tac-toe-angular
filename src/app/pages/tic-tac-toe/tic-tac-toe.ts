import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-tic-tac-toe',
  imports: [],
  template: `<div class="game_container">
    <div class="tic-tac-toe_container">
      @for(cell of board(); let i = $index;track i){
      <div class="cell" (click)="play(i)">
        @if(cell){
        <div class="sign_container" [class.winner]="winningCells().includes(i)">
          {{ cell }}
        </div>
        }
      </div>
      }
    </div>
    <div class="info_container" [class.x-turn]="turn() === 'X'" [class.o-turn]="turn() === 'O'">
      @if (!winner() && !isFilled) {
      <p class="info_paragraph">Player {{ player() }} ({{ turn() }}) turn</p>
      } @else if (winner()) {
      <p class="info_paragraph">Player {{ winner() === 'X' ? 1 : 2 }} ({{ winner() }}) won!</p>
      } @else if (!winner() && isFilled) {
      <p class="info_paragraph">TIE</p>
      }
      <button (click)="resetGame()" class="reset-btn">Reset Game</button>
    </div>
  </div> `,
  styles: `
  .heading {
  color: #fff;
  font-size: 25px;
  font-weight: 800;
  background-image: linear-gradient(to right, #e98686, #838b0a);
  text-align: center;
  margin-top: 1.2rem;
  background-clip: text;
  color: transparent;
  margin-bottom: 0;
}

.game_container {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 35px;
  margin-top: 4rem;
}

.tic-tac-toe_container {
  display: grid;
  grid-template-columns: repeat(3, minmax(50px, 1fr));
  grid-template-rows: repeat(3, minmax(50px, 1fr));
  width: 500px;
  height: 400px;
  max-width: 500px;
  max-height: 400px;

  @media (max-width: 32.5em) {
    width: 350px;
    max-width: 350px;
    height: 300px;
    max-height: 300px;
  }

  @media (max-width: 24.5em) {
    width: 300px;
    max-width: 300px;
    height: 250px;
    max-height: 250px;
  }
}

.cell {
  cursor: pointer;
}

/* jo kolona e fundit , div ne pozicionet 3,6,9 */
.cell:not(:nth-child(3n)) {
  // border-right: 4px solid #ffffff33;
  border-right: 4px solid #ffffff;
}

/* jo rreshti i fundit , div ne pozicionet 3,2,1*/
.cell:not(:nth-last-child(-n + 3)) {
  border-bottom: 4px solid #ffffff;
}

.sign_container {
  width: 100%;
  height: 100%;
  font-size: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  background-image: linear-gradient(to right, #ffffff, #46acd8);
  background-clip: text;
  color: transparent;
  animation: fadeIn ease 0.4s;

  @media (max-width: 32.5em) {
    font-size: 7rem;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: scale(1.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes pulse {
  from {
    filter: drop-shadow(0 0 8px rgba(8, 238, 100, 0.4));
    transform: scale(0.95);
  }
  to {
    filter: drop-shadow(0 0 16px rgba(0, 255, 100, 0.7));
    transform: scale(1.2);
  }
}

.winner {
  animation: pulse 0.3s infinite alternate ease-in-out;
}

.info_container {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info_paragraph {
  font-family: 'Orbitron', 'Segoe UI', sans-serif;
  font-size: 1.4rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #f5f5f5;
  background: linear-gradient(90deg, #2ecc71, #a3ff12);
  background-clip: text;
  color: transparent;
  margin: 0;
  padding: 8px 16px;
  text-align: center;
  transition: all 0.3s ease;
}

.x-turn {
  color: #00eaff;
  text-shadow: 0 0 10px rgba(0, 234, 255, 0.6);
}

.o-turn {
  color: #ff4d4d;
  text-shadow: 0 0 10px rgba(255, 77, 77, 0.6);
}

.reset-btn {
  margin-top: 14px;
  padding: 10px 26px;
  font-size: 1.2rem;
  font-weight: 600;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #eaff00;
  background: transparent;
  border: 2px solid #eaff00;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.25s ease;
}

.reset-btn:hover {
  background: #eaff00;
  color: #000;
  box-shadow: 0 0 18px rgba(234, 255, 0, 0.6);
  transform: translateY(-1px);
}

.reset-btn:active {
  transform: scale(0.96);
}
`,
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
    this.checkWinner();
    this.player.set(this.turn() === 'X' ? 2 : 1);
    this.turn.set(this.turn() === 'X' ? 'O' : 'X');
  }

  checkWinner() {
    for (const combo of this.winningCombos) {
      const [a, b, c] = combo;
      if (
        this.board()[a] &&
        this.board()[a] === this.board()[b] &&
        this.board()[b] === this.board()[c]
      ) {
        this.winner.set(this.turn());
        this.winningCells.set(combo);
        return;
      }
    }
    this.winner.set(null);
  }

  get isFilled(): boolean {
    return this.board().every((c) => c !== null);
  }

  resetGame() {
    this.board.set(Array(9).fill(null));
    this.turn.set('X');
    this.player.set(1);
    this.winner.set(null);
    this.winningCells.set([]);
  }
}
