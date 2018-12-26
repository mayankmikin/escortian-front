import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileuploadComponent } from './fileupload/fileupload.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './page/dashboard/dashboard.component';
import { ChildComponent } from './child/child.component'


@NgModule({
  declarations: [
    AppComponent,
    FileuploadComponent,
    LoginComponent,
    HomeComponent,
    DashboardComponent,
    ChildComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
