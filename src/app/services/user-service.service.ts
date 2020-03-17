import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url:string = "http://localhost:5000";

  constructor(private http:HttpClient) {}

  getAll(){
    return this.http.get<User[]>(this.url + '/users');
  }

  addItem(user){
    return this.http.post<User[]>(this.url + '/users/', user)
  }

  deleteItem(id:number){
    return this.http.delete<User[]>(this.url + '/users/' +id)
  }

  editItem(user){
    return this.http.put<User[]>(this.url + '/users/', user)
  }

}

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  rol: string;
}