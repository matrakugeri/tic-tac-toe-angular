import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('./pages/tic-tac-toe/tic-tac-toe').then((m) => m.TicTacToe),
  },
  {
    path: '**',
    loadComponent: () => import('./pages/tic-tac-toe/tic-tac-toe').then((m) => m.TicTacToe),
  },
  {
    path: 'TicTacToe',
    loadComponent: () => import('./pages/tic-tac-toe/tic-tac-toe').then((m) => m.TicTacToe),
  },
];
