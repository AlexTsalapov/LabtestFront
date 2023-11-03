import {Component, OnInit} from '@angular/core';
import {SensorService} from '../../services/sensor.service';
import {Sensor} from '../../models/sensor.model';
import {CookieService} from 'ngx-cookie-service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-sensor',
    templateUrl: './sensor.component.html',
    styleUrls: ['./sensor.component.css'],
})
export class SensorComponent implements OnInit {
    search = '';
    sensors: Sensor[] = [];
    p: number = 0;
    itemsPerPage: number = 4;
    totalPages: number = 0;
    paginatedSensors: Sensor[][] = [];
    isAdmin:boolean=false


    constructor(private sensorService: SensorService, private cookieService: CookieService, private router: Router) {
    }

    logout() {
        this.cookieService.set('token', '');
        this.cookieService.set('role', '');
        this.router.navigate(["/login"]);
    }

    ngOnInit(): void {
      if(this.cookieService.get('role')==='ROLE_ADMINISTRATOR') {
        this.isAdmin=true
      }
      else{
        this.isAdmin=false
      }
        this.sensorService.getAllSensors().subscribe((sensors: Sensor[]) => {
          sensors.forEach(sensor => {
            if (sensor.unit && sensor.unit.includes('Celsium')) {
              sensor.unit = sensor.unit.replace('Celsium', '°C');
            }
          })
            this.sensors = sensors; // Обновляем поле sensors
            this.totalPages = this.getTotalPages();
            this.paginatedSensors = this.getPaginatedSensors();
        });
    }


     editSensor(sensor: Sensor) {
        console.log(`Editing sensor with ID: ${sensor.id}`);
        this.router.navigate(['/sensorAdd', sensor.id]);
    }

    getTotalPages(): number {
        return Math.ceil(this.sensors.length / this.itemsPerPage);
    }

    getPaginatedSensors(): Sensor[][] {
        const pages: Sensor[][] = [];
        for (let i = 0; i < this.sensors.length; i += this.itemsPerPage) {
            pages.push(this.sensors.slice(i, i + this.itemsPerPage));
        }
        return pages;
    }

    changePage(page: number): void {
        this.p = page;
        this.paginatedSensors = this.getPaginatedSensors(); // Обновляем данные на странице

    }


    deleteSensor(sensor: Sensor) {
        this.sensorService.deleteSensor(sensor.id).subscribe((result: boolean) => {
            if (result) {
                this.ngOnInit()
            }
        });

    }

    addSensor() {
        console.log('Adding a new sensor');
      this.router.navigate(['/sensorAdd', -1]);
    }


    found() {
        if (this.search !== "") {
            this.sensorService.searchSensors(this.search).subscribe((searchResults: Sensor[]) => {
                this.sensors = searchResults;
                this.changePage(0);
                this.totalPages = this.getTotalPages();
                this.paginatedSensors = this.getPaginatedSensors();
            });
        } else {
           this.ngOnInit()
        }
    }

}
