import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Country } from '../country';
import { Standings, Standing } from '../league';
import { LeagueService } from '../league.service';

@Component({
  selector: 'app-league-standing',
  templateUrl: './league-standing.component.html',
  styleUrls: ['./league-standing.component.css']
})
export class LeagueStandingComponent {
  public countryCode!: string;
  public selectedCountry!: Country | null;
  public leagueId!: number;
  public leagueStandings!: Standing[];
  private paramSubscription!: Subscription;
  private leagueStandingSubscription!: Subscription;
  public showSpinner: boolean = false;
  public errorMessage: string = '';
  public countries: Country[] = [
    {
      name: 'England',
      code: 'england',
      leagueId: 39
    },
    {
      name: 'Spain',
      code: 'spain',
      leagueId: 140
    },
    {
      name: 'Germany',
      code: 'germany',
      leagueId: 78
    },
    {
      name: 'France',
      code: 'france',
      leagueId: 61
    },
    {
      name: 'Italy',
      code: 'italy',
      leagueId: 135
    }
  ];
  constructor(private route: ActivatedRoute, private router: Router, private leagueService: LeagueService) {

  }

  ngOnInit(): void {
    this.paramSubscription = this.route.queryParams.subscribe(param => {
      this.leagueId = param['league'];
      this.selectedCountry = this.countries.filter(c => c.leagueId == this.leagueId)[0];
      if (this.leagueId) {
        this.getLeagueStanding(this.leagueId);
      }
    });

  }

  getLeagueStanding(leagueId: number = 0) {
    let currentDate = new Date();
    if (this.leagueStandings) {
      this.leagueStandings.length = 0;
    }
    this.showSpinner = true;
    this.leagueStandingSubscription = this.leagueService.getLeagueStanding(leagueId, currentDate.getFullYear()).subscribe({
      next: (data) => {
        if (data.errors && !(data.errors instanceof Array)) {
          this.errorMessage = data.errors[Object.keys(data.errors)[0]];
        }
        else {
          this.leagueStandings = data.response[0].league.standings[0];
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

  onCountrySelect(country: Country) {
    this.selectedCountry = country;
    this.leagueId = country.leagueId;
    this.getLeagueStanding(country.leagueId);
  }

  ngOnDestroy(): void {
    this.paramSubscription?.unsubscribe();
    this.leagueStandingSubscription?.unsubscribe();
  }

}
