import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaguesComponent } from './leagues/leagues.component';
import { TeamComponent } from './team/team.component';

const routes: Routes = [
  { path: 'leagues/:id', component: LeaguesComponent },
  { path: 'leagues/:id/:teamId', component: TeamComponent},

  { path: '**', redirectTo: '/leagues/england', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
