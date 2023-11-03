import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SensorComponent } from './pages/sensors/sensor.component';
import { AuthGuard } from './guards/auth.guard';
import {SensorsAddComponent} from "./pages/sensorAdd/sensorAdd.component";

const routes: Routes = [
  { path: '', redirectTo: '/sensors', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'sensors', component: SensorComponent, canActivate: [AuthGuard] },
  { path: 'sensorAdd/:id', component: SensorsAddComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],

})
export class AppRoutingModule {}
