import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-info',
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.scss'],
})
export class ModalInfoComponent implements OnInit {

  item:any = {};

  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.item = navParams.get('itemInfo');
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



}
