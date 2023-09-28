import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamesDetailComponent } from './games-detail/games-detail.component';
import { LeagueStandingComponent } from './league-standing/league-standing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';


const routes: Routes = [
  {
    path: 'home',
    component: LeagueStandingComponent,
  },
  {
    path: 'gameDetails/:leagueId/:teamId',
    component: GamesDetailComponent,
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'home'
  },
  {
    path: '**', component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
