import { Routes } from '@angular/router';
import { TicTacToe } from './pages/tic-tac-toe/tic-tac-toe';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'TicTacToe',
  },
  {
    path: '**',
    redirectTo: 'TicTacToe',
  },
  {
    path: 'TicTacToe',
    loadComponent: () => import('./pages/tic-tac-toe/tic-tac-toe').then((m) => m.TicTacToe),
  },
];
