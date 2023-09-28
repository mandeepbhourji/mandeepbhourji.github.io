import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { LeagueStandingComponent } from './league-standing/league-standing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GamesDetailComponent } from './games-detail/games-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    TopBarComponent,
    LeagueStandingComponent,
    PageNotFoundComponent,
    GamesDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
