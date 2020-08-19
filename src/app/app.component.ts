import { Component } from '@angular/core';

type Player = 'X' | 'O';

const winnerCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  currentPlayer: Player;
  winner: Player;
  board: Array<Player>;
  gameEnded = false;

  constructor() {
    this.reset();
  }

  onClick(i: number) {
    if (!this.board[i] && !this.winner) {
      this.board[i] = this.currentPlayer;

      if (this.won(this.currentPlayer)) {
        this.winner = this.currentPlayer;
        this.gameEnded = true;
      } else {
        this.checkGameEnded();
        if (!this.gameEnded) {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
        }
      }
    }
  }

  reset() {
    this.board = new Array(9).fill(null);
    this.currentPlayer = 'X';
    this.winner = null;
    this.gameEnded = false;
  }

  private won(player: Player): boolean {
    return !!winnerCombinations.find(
      ([a, b, c]: [number, number, number]) => this.board[a] === player && this.board[b] === player && this.board[c] === player);
  }

  private checkGameEnded() {
    let cnt = 0;
    this.board.forEach(p => {
      if (!!p) {
        cnt++;
      }
    });

    this.gameEnded = cnt === this.board.length;
  }
}
