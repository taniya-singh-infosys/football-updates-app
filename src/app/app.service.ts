import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ActivatedRoute, Params } from '@angular/router';
import {StandingModel,ApiStanding} from './shared/league.model'
import {TeamModel,ApiTeams} from './shared/team.model'
import {CountryModel,ApiCountry} from './shared/country.model'


const headers = new HttpHeaders({
  'x-rapidapi-host': 'v3.football.api-sports.io',
  "x-rapidapi-key": "24bf4e46e9faadeef089d536f10aeb08",
});
import * as CONSTANTS from '././shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public league_id!: number;
  public configUrl: string = CONSTANTS.configUrl
  constructor(private http: HttpClient, private route: ActivatedRoute) { }

  // getLeagues() {
  //   let url = `${this.configUrl}leagues`;
  //   return this.http.get<any>(url, { headers });
  // }
  getCounties() {
    let url = `${this.configUrl}countries`;
    return this.http.get<ApiCountry>(url, { headers });
  }
  getTeamGames(team_id: number) {
    let params = new HttpParams().append("team", team_id).append("season", 2023);
    let url = `${this.configUrl}fixtures`;
    return this.http.get<ApiTeams>(url, { headers, params });
  }
  getStandingByCountry(country: string) {
    if (country == 'England' || country == 'england') {
      this.league_id = CONSTANTS.england
    } else if (country == 'Spain' || country == 'spain') {
      this.league_id = CONSTANTS.spain
    }
    else if (country == 'France' || country == 'france') {
      this.league_id = CONSTANTS.france
    }
    else if (country == 'Germany' || country == 'germany') {
      this.league_id = CONSTANTS.germany
    }
    else if (country == 'Italy' || country == 'italy') {
      this.league_id = CONSTANTS.italy
    }
    let params = new HttpParams().append("league", this.league_id).append("season", 2023);
    let url = `${this.configUrl}standings`;
    return this.http.get<ApiStanding>(url, { headers, params });
  }

}
