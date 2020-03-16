import { Component, OnInit, Input } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.scss'],
})
export class ModalEditComponent implements OnInit {

  @Input() itemInfo: any;
  
  person:string;
  model:Persona = {id: 0, name: "", age: 0, city: "", phone: 0, province: ""};
  private provinces:string[]=["Andalusia", "Catalonia", "Community of Madrid", "Valencian Community", "Galicia", "Castile and León", "Basque Autonomous Community",
  "Castilla-La Mancha", "Canary Islands", "Region of Murcia", "Aragon", "Extremadura", "Balearic Islands", "Principality of Asturias", "Community of Navarre", "Cantabria", "La Rioja", "Ceuta", "Melilla"]

  constructor(private navParams: NavParams, private modalController: ModalController) {
    this.model = navParams.get('itemInfo');
    this.person = this.model.name;
    console.log("Parametros recividos=>" + this.model);

  }

  ngOnInit() {
  } 

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
      'person': this.model
    });
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


