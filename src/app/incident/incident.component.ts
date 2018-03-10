import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Incident} from "./incident";
import {IncidentHistory} from "./incidenthistory"
import {environment} from "../../environments/environment"

@Component({
  selector: 'app-incident',
  templateUrl: './incident.component.html',
  styleUrls: ['./incident.component.css']
})
export class IncidentComponent implements OnInit {
  title: string = "Incident incident";
  endpoint: string = "/incident";
  incident: Incident[] = [ ];
  history: IncidentHistory[] = [ ];
  currentIncident: Incident = <Incident>{
    id: 0,
    createdate: 'yyyy-mm-dd',
    title: '',
    organization: {id: 0},
    priority: {id: 0},
    user: {id: 0},
    admin: {id: 1}
  };
  currentHistory: IncidentHistory = <IncidentHistory>{
    id: 0,
    message: '',
    user: {id: 0}
  };
  constructor (private http: HttpClient) {}
  ngOnInit(): void {
    console.log(environment.api);
    this.getIncident();
  }
  getIncident(): void {
    this.http.get<Incident[]>(environment.api + this.endpoint).subscribe(data => {
      console.log(data);
      //noinspection TypeScriptValidateTypes
      this.incident = data;
    });
  }
  clearCurrentIncident(): void {
    this.currentIncident = <Incident>{
      id: 0,
      createdate: 'yyyy-mm-dd',
      title: '',
      organization: {id: 0},
      priority: {id: 0},
      user: {id: 0},
      admin: {id: 1}
    };
    this.currentHistory = {
      id: 0,
      message: '',
      user: {id: 0}
    };
    this.history = [];
  }
  setCurrentIncident(item: Incident): void {
    this.currentIncident = item;
  }
  addIncident(): void {
    this.http.post(environment.api + this.endpoint, this.currentIncident).subscribe(() => {
      this.getIncident();
      this.clearCurrentIncident();
    });
  }
  updateIncident(): void {
    this.http.post(environment.api + this.endpoint, this.currentIncident).subscribe(() => {
      this.getIncident();
      this.clearCurrentIncident();
    });
  }
  removeIncident(): void {
    this.http.delete(environment.api + this.endpoint + "/" + this.currentIncident.id).subscribe(() => {
      this.getIncident();
      this.clearCurrentIncident();
    });
  }
  loadIncidentHistory(item: Incident): void {
    this.currentIncident = item;
    this.http.get<IncidentHistory[]>(environment.api + "/incident/" + this.currentIncident.id + "/history").subscribe(data => {
      console.log(data);
      //noinspection TypeScriptValidateTypes
      this.history = data;
    });
  }

  addIncidentHistory(): void {
    this.http.post(environment.api + "/incident/" + this.currentIncident.id + "/history", this.currentHistory).subscribe(() => {
      this.loadIncidentHistory(this.currentIncident)
      this.currentHistory = {
        id: 0,
        message: '',
        user: {id: 0}
      };
    });
  }

  removeIncidentHistory(item: IncidentHistory): void {
    this.http.delete(environment.api + "/incident/" + this.currentIncident.id + "/history/" + item.id).subscribe(() => {
      this.loadIncidentHistory(this.currentIncident)
    });
  }
}
