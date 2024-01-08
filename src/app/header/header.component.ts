import { Component, ElementRef,Output, OnInit,EventEmitter } from '@angular/core';
import {AppService} from './../app.service'
import { ActivatedRoute,Router } from '@angular/router'
import {CountryModel} from './../shared/country.model'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  public countries!:CountryModel[]
  public selectedCountries:CountryModel[]=[]
  constructor( public appService:AppService, public router:Router){
  }
  ngOnInit(): void {
    this.getCounties()  
  }
  getCounties(){
    var countriesFromStorage= localStorage.getItem('countries')
    if(!countriesFromStorage) {
      this.appService.getCounties().subscribe(data=>{
        localStorage.setItem(`countries`, JSON.stringify(data.response));
         this.countries=data.response
         if(this.countries)this.getFilteredCountries()
      })
   }else{
    this.countries =JSON.parse(countriesFromStorage)
    if(this.countries)this.getFilteredCountries()
   }
  }
  getFilteredCountries(){
    this.countries.filter((item:CountryModel)=>{
      if(item.name=='England' || item.name=='Spain' || item.name=='Germany' || item.name=='France' || item.name=='Italy'){
        this.selectedCountries.push(item)
      }
    })
  }
  redirectToLeagues(country:CountryModel){
    this.router.navigate([`/leagues/${country.name}`])

  }


}
