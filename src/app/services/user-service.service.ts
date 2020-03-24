import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private url:string = "https://localhost:5001";

  constructor(private http:HttpClient) {}

  getAll(){
    return this.http.get<User[]>(this.url + '/users');
  }

  addItem(user){
    return this.http.post<User>(this.url + '/users/', user);
  }

  deleteItem(id:number){
    return this.http.delete<User>(this.url + '/users/' + id);
  }

  editItem(id, user){
    console.log(user);
    return this.http.put(this.url + '/users/' + id, user);
  }

}
