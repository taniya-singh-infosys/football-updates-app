import { Component, OnInit } from '@angular/core';
import {AppService} from './../app.service'
import { HeaderComponent } from '../header/header.component';
import { ActivatedRoute,Router } from '@angular/router'
import { TeamModel} from './../shared/team.model'
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrl: './team.component.css'
})
export class TeamComponent implements OnInit {
  public teams!: TeamModel[];
  public teamId!: number
  return_value : string ="";
  constructor(public appService:AppService, public route:ActivatedRoute,public router:Router,private spinner: NgxSpinnerService){
 
  }
  ngOnInit(): void {
  this.route.params.subscribe(routeParams => {
    let id=this.route.snapshot.paramMap.get('teamId')
    this.return_value = routeParams["id"];
    this.teamId= Number(id)
    this.getTeamData()
  });
  }
  getTeamData(){
    this.spinner.show();
    var teamsFromStorage= localStorage.getItem(`team-${this.teamId}`)
    if(!teamsFromStorage) {
      this.appService.getTeamGames(this.teamId).subscribe(data=>{
          localStorage.setItem(`team-${this.teamId}`, JSON.stringify(data.response));
          this.teams=data.response
          this.spinner.hide()
      })
    }
  else {
    this.teams=JSON.parse(teamsFromStorage)
    this.spinner.hide()
  }
  }
}
