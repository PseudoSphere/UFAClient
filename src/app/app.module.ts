// Angular Core
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";

// Components
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EntryformComponent } from './components/entryform/entryform.component';
import { LoginComponent } from './components/login/login.component';
import { DataComponent } from './components/data/data.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';

//Globals
import { UserControlService } from './globals/user-control.service';


const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'input', component: EntryformComponent},
  {path: 'data', component: DataComponent},
  {path: 'profile', component: ProfileComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    EntryformComponent,
    LoginComponent,
    DataComponent,
    HomeComponent,
    RegisterComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [UserControlService],
  bootstrap: [AppComponent]
})
export class AppModule { }
