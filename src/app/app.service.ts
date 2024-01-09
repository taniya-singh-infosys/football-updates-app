import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'
import { ActivatedRoute, Params } from '@angular/router';
import {StandingModel,ApiStanding} from './shared/league.model'
import {TeamModel,ApiTeams} from './shared/team.model'
import {CountryModel,ApiCountry} from './shared/country.model'


const headers = new HttpHeaders({
  'x-rapidapi-host': CONSTANTS.API_HOST,
  "x-rapidapi-key": CONSTANTS.API_KEY,
});
import * as CONSTANTS from '././shared/constants';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public league_id!: number;
  public currentYear:number
  public configUrl: string = CONSTANTS.configUrl
  constructor(private http: HttpClient, private route: ActivatedRoute) {
    // using current year - 1 because there is no data for year 2024
    this.currentYear = new Date().getFullYear()-1
    console.log("year",this.currentYear) 
   }

  // getLeagues() {
  //   let url = `${this.configUrl}leagues`;
  //   return this.http.get<any>(url, { headers });
  // }
  getCounties() {
    let url = `${this.configUrl}countries`;
    return this.http.get<ApiCountry>(url, { headers });
  }
  getTeamGames(team_id: number) {
    let params = new HttpParams().append("team", team_id).append("season", this.currentYear);
    let url = `${this.configUrl}fixtures`;
    return this.http.get<ApiTeams>(url, { headers, params });
  }
  getStandingByCountry(country: string) {
    country= country.toLowerCase()
    
    if (country == 'england') {
      this.league_id = CONSTANTS.england
    } else if (country == 'spain') {
      this.league_id = CONSTANTS.spain
    }
    else if (country == 'france') {
      this.league_id = CONSTANTS.france
    }
    else if (country == 'germany') {
      this.league_id = CONSTANTS.germany
    }
    else if (country == 'italy') {
      this.league_id = CONSTANTS.italy
    }
    let params = new HttpParams().append("league", this.league_id).append("season", this.currentYear);
    let url = `${this.configUrl}standings`;
    return this.http.get<ApiStanding>(url, { headers, params });
  }

}
