import { Component, OnInit,ViewChild } from '@angular/core';
import {AppService} from './../app.service'
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute,Router } from '@angular/router'
import {StandingModel} from './../shared/league.model'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-leagues',
  templateUrl: './leagues.component.html',
  styleUrl: './leagues.component.css'
})
export class LeaguesComponent implements OnInit {
  public countryName!:string
  public selectedLeagues!:StandingModel[]
  
  constructor(public appService:AppService, public route:ActivatedRoute,public router:Router,public spinner:NgxSpinnerService){
  
  }
  ngOnInit(): void {
  this.route.params.subscribe(routeParams => {
    this.spinner.show()
    this.countryName = routeParams['id']
    this.getStandings()
  });
  }
  showTeamDetails(teadId?:number){
    this.router.navigate([`/leagues/${this.countryName}/${teadId}`])
  }
 
  getStandings(){
    this.spinner.show();
    var itemsFromStorage= localStorage.getItem(this.countryName)
    if(!itemsFromStorage) {
      this.appService.getStandingByCountry(this.countryName).subscribe(data=>{
        localStorage.setItem(this.countryName, JSON.stringify(data.response));
        this.selectedLeagues=data.response
        this.spinner.hide()
      })
    }
  else {
    this.selectedLeagues=JSON.parse(itemsFromStorage)
    this.spinner.hide()
  }
  }


}
