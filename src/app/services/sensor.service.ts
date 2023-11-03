import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map, Observable, of} from 'rxjs';
import {Sensor} from '../models/sensor.model';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class SensorService {
  private sensorUrl = 'http://localhost:8881/sensors'; // URL для работы с сенсорами в вашем API
  constructor(private http: HttpClient) {
  }


  searchSensors(search: string) {
    return this.http.get<Sensor[]>(`${this.sensorUrl}/search${search}`);
  }

  getAllSensors(): Observable<Sensor[]> {

    return this.http.get<Sensor[]>(`${this.sensorUrl}/all`);

  }
  getSensor(id: number): Observable<Sensor> {

    return this.http.get<Sensor>(`${this.sensorUrl}/${id}`);

  }


  createSensor(sensor: Sensor): Observable<Sensor> {
    return this.http.post<Sensor>(`${this.sensorUrl}/create`, sensor);
  }

  getTypes(): Observable<string[]>  {
    console.log(9)
    return this.http.get<string[]>(`${this.sensorUrl}/types`);
  }

  getUnits(): Observable<string[]>  {
    console.log(10)
    return this.http.get<string[]>(`${this.sensorUrl}/units`);
  }

  updateSensor(id: number, sensor: Sensor): Observable<Sensor> {
    return this.http.put<Sensor>(`${this.sensorUrl}/${id}`, sensor);
  }

  deleteSensor(id: number): Observable<boolean> {
    return this.http.delete(`${this.sensorUrl}/delete/${id}`).pipe(
      map(() => {
        console.log('Sensor deleted successfully');
        // Дополнительная логика после удаления, если нужно
        return true;
      }),
      catchError((error) => {
        console.error('Failed to delete sensor:', error);
        // Обработка ошибки удаления, если нужно
        return of(false); // Возвращаем false в случае ошибки
      })
    );
  }
}
