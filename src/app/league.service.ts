import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map, Observable } from 'rxjs';
import { Standings } from './league';
import { GameDetails } from './game-detail';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private httpClient: HttpClient) { }


  commonHeaders(): HttpHeaders {
    return new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "2d4f3ded54dbaca172241b5bf6ad80c9"
    });
  }


  getLeagueStanding(leagueId: number, season: number): Observable<Standings> {
    return this.httpClient.get(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`, { headers: this.commonHeaders() })
      .pipe(map(res => res as Standings));
  }

  getTeamDetails(team: number, leagueId: number, last: number): Observable<GameDetails> {
    return this.httpClient.get(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&team=${team}&last=${last}`, { headers: this.commonHeaders() })
      .pipe(map(res => res as GameDetails));
  }
}
