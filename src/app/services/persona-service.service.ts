import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Persona } from '../models/persona';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private url:string = "https://localhost:5001";

  constructor(private http:HttpClient) {}

  getAll(){
    return this.http.get<Persona[]>(this.url + '/personas');
  }

  addItem(person){
    return this.http.post<Persona>(this.url + '/personas/', person)
  }

  deleteItem(id:number){
    return this.http.delete<Persona>(this.url + '/personas/' +id)
  }

  editItem(id, person){
    return this.http.put<Persona>(this.url + '/personas/' + id, person)
  }

}
