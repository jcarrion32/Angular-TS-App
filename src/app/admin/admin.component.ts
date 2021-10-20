import { Component, OnInit } from '@angular/core';
import { Flight } from '../flight.model';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private flightService: ApiService) { }

  loading = true;
 
  origin!: string;
  destination!: string;
  flightNumber!: number;
  depart!: Date;
  arrive!: Date;
  nonstop: boolean = false;
  flightList!: any[];

  ngOnInit(): void {
    this.refresh();
  }

  toggleNonStop(){
    this.nonstop = !this.nonstop;
  }

  sendFlight(){
    const flight: Flight = {
      origin: this.origin, 
      destination: this.destination,
      flightNumber: this.flightNumber,
      depart: this.depart,
      arrive: this.arrive,
      nonstop: this.nonstop
    }
    this.flightService.postFlight(flight);
    console.log('New Flight added');
  }

  update(flight:Flight){
    this.flightService.updateFlight(flight).subscribe(data =>{
     // if(data && data['affected']){
        this.refresh();
     //}
    });
  }

  delete(flight:Flight){
   // if (window.confirm('are you sure you want to delete this flight? ')){
      this.flightService.deleteFlight(flight.id as number).subscribe(data =>{
       // if(data && data['affected']){
          this.refresh();
      //  }
      });
   // }
    }
  

  

  refresh(){
    this.loading = true;
    this.flightService.getAllFlights().subscribe(data =>{
      this.flightList = data;
      this.loading = false;
    })
  }

}