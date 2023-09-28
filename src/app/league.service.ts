import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  constructor(private httpClient: HttpClient) { }

  
  commonHeaders() {
    return new HttpHeaders({
      "x-rapidapi-host": "v3.football.api-sports.io",
      "x-rapidapi-key": "2d4f3ded54dbaca172241b5bf6ad80c9"
    });
  }

  getLeagueStanding(leagueId: number, season: number) {
    return this.httpClient.get(`https://v3.football.api-sports.io/standings?league=${leagueId}&season=${season}`, { headers: this.commonHeaders() })
      .pipe(map((res: any) => (res.response && res.response.length > 0 ? res.response[0]['league']['standings'][0] : res))
      );
  }

  getTeamDetails(team: number, leagueId: number, last: number) {
    return this.httpClient.get(`https://v3.football.api-sports.io/fixtures?league=${leagueId}&team=${team}&last=${last}`, { headers: this.commonHeaders() })
      .pipe(map((res: any) => (res.response && res.response.length > 0 ? res.response : res))
      );
  }
}
