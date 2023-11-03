import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing-module';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SensorComponent} from "./pages/sensors/sensor.component";
import {AuthGuard} from "./guards/auth.guard";
import {TokenInterceptor} from "./interceptors/token.interceptor";
import { CookieService } from 'ngx-cookie-service';
import {NgxPaginationModule} from "ngx-pagination";
import {SensorsAddComponent} from "./pages/sensorAdd/sensorAdd.component";
import {ButtonComponent} from "./components/button/button.component";
import {LabelComponent} from "./pages/sensorAdd/label/label.component";
import {LabelChooseComponent} from "./pages/sensorAdd/labelChoose/labelChoose.component";
import {LabelDbChooseComponent} from "./pages/sensorAdd/labelDbChoose/labelDbChoose.component";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TooltipModule} from "ngx-bootstrap/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SensorComponent,
    SensorsAddComponent,
    ButtonComponent,
    LabelComponent,
    LabelChooseComponent,
    LabelDbChooseComponent
    // Другие компоненты
  ],
  imports: [
    TooltipModule,
    NgxPaginationModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard, CookieService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },],

  bootstrap: [AppComponent]
})
export class AppModule { }
