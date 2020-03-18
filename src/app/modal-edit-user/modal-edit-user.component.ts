import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';
import { User } from '../models/user';

@Component({
  selector: 'app-modal-edit-user',
  templateUrl: './modal-edit-user.component.html',
  styleUrls: ['./modal-edit-user.component.scss'],
})
export class ModalEditUserComponent implements OnInit {

  @Input() itemInfo: any;
  
  user:string;
  model:User = {id: 0, username: undefined, firstname: undefined, lastname: undefined, password: undefined, rol: undefined};
  private roles:string[]=["Admin", "Default"];

  constructor(private navParams: NavParams, private modalController: ModalController) { 
    this.model = navParams.get('itemInfo');
    this.user = this.model.username;
    console.log(this.model);
    
  }

  ngOnInit() {}

  dismiss() {
    console.log("dismis");
    
    // using the injected ModalController this page
    // can "dismiss" itself and optionally pass back data
    this.modalController.dismiss({
      'dismissed': true
    });
  }

  submit(){
    this.modalController.dismiss({
      'dismissed': true,
      'user': this.model
    });
  }

}
