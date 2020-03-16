import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PersonaServiceService {

  private url:string = "http://localhost:5000";

  constructor(private http:HttpClient) {}

  getAll(){
    return this.http.get<Persona[]>(this.url + '/personas');
  }

  addItem(person){
    return this.http.post<Persona[]>(this.url + '/personas/', person)
  }

  deleteItem(id:number){
    return this.http.delete<Persona[]>(this.url + '/personas/' +id)
  }

  editItem(person){
    return this.http.put<Persona[]>(this.url + '/personas/', person)
  }

}

interface Persona {
  id: number;
  name: string;
  age: number;
  city: string;
  phone: number;
  province: string;
}
