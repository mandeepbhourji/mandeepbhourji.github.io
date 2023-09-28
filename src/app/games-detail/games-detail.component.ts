import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { GameDetail } from '../game-detail';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-games-detail',
  templateUrl: './games-detail.component.html',
  styleUrls: ['./games-detail.component.css']
})
export class GamesDetailComponent {
  private paramSubscription!: Subscription;
  private fixturesSubscription!: Subscription;
  public gamesDetail!: GameDetail[];
  private leagueId!: number;
  public showSpinner: boolean = false;
  public errorMessage: string = '';
  constructor(private route: ActivatedRoute, private leagueService: LeagueService, private router: Router) {

  }
  ngOnInit() {
    this.paramSubscription = this.route.params.subscribe(param => {
      this.leagueId = param['leagueId'];
      let teamId = param['teamId'];
      this.getTeamDetails(teamId, this.leagueId);
    });
  }

  moveToStangings(): void {
    this.router.navigate(['home'], { queryParams: { league: this.leagueId } });
  }
  
  getTeamDetails(team: number = 0, leagueId: number = 0) {
    this.showSpinner = true;
    let numberOfFixtures = 10;

    this.fixturesSubscription = this.leagueService.getTeamDetails(team, leagueId, numberOfFixtures).subscribe({
      next: (data) => {
        if (data.response && data.response.length > 0) {
          this.gamesDetail = data.response.map((x: GameDetail) => {
            return { teams: x.teams, goals: x.goals }
          })
        } else if (data.errors && !(data.errors instanceof Array)) {
          this.errorMessage = data.errors[Object.keys(data.errors)[0]];
        }
      },
      error: (err) => {
        this.showSpinner = false;
      },
      complete: () => {
        this.showSpinner = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.fixturesSubscription?.unsubscribe();
  }


}
