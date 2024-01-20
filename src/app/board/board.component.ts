import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [NgIf, NgFor, CardComponent],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent implements OnInit {
  cards: Array<'X' | 'O' | null> = Array(9);
  xIsNext: boolean = false;
  winner: string | null = null;
  moves: number = 0;
  resetTime: number = 3;
  readonly winningCommbinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  get player(): 'X' | 'O' {
    return this.xIsNext ? 'X' : 'O';
  }

  ngOnInit(): void {
    this.newGame();
  }

  newGame(): void {
    this.cards.fill(null);
    this.winner = null;
    this.xIsNext = false;
    this.moves = 0;
    this.resetTime = 3;
  }

  resetGame(): void {
    const ressetInterval = setInterval(() => {
      this.resetTime--;
      if (this.resetTime === -1) {
        clearInterval(ressetInterval);
        this.newGame();
      }
    }, 1000);
  }

  makeMove(idx: number): void {
    if (this.cards[idx] || this.winner) return;

    this.cards.splice(idx, 1, this.player);
    this.xIsNext = !this.xIsNext;
    this.moves++;

    if (this.moves >= 5) this.winner = this.calculateWinner();
    if (this.moves === 9 && !this.winner) {
      this.resetGame();
      return;
    }
  }

  calculateWinner(): null | 'X' | 'O' {
    for (let i = 0; i < this.winningCommbinations.length; i++) {
      const [a, b, c] = this.winningCommbinations[i];

      if (
        this.cards[a] &&
        this.cards[a] === this.cards[b] &&
        this.cards[a] === this.cards[c]
      )
        return this.cards[a];
    }
    return null;
  }
}
