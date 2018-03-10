// /var/www/html
// ng build --prod -e prod

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { IncidentComponent } from './incident/incident.component';
import {Routes, RouterModule} from '@angular/router';
import { UsersComponent } from './users/users.component';
import { OrganizationComponent } from './organization/organization.component';

export const routes: Routes = [
  { path: '', redirectTo: 'incident', pathMatch: 'full' },
  { path: 'incident', component: IncidentComponent },
  { path: 'users', component: UsersComponent },
  { path: 'organization', component: OrganizationComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    IncidentComponent,
    UsersComponent,
    OrganizationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
