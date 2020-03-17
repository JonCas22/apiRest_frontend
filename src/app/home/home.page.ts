import { Component } from '@angular/core';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { ModalInfoComponent } from './../modal-info/modal-info.component';
import { ToastController, ModalController } from '@ionic/angular';
import { PersonaServiceService } from '../services/persona-service.service';
import { UserServiceService } from '../services/user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private people: Persona[];
  private users: User[];
  private searchPeopleList:Persona[];
  private provinces:string[]=["Andalusia", "Catalonia", "Community of Madrid", "Valencian Community", "Galicia", "Castile and León", "Basque Autonomous Community",
   "Castilla-La Mancha", "Canary Islands", "Region of Murcia", "Aragon", "Extremadura", "Balearic Islands", "Principality of Asturias", "Community of Navarre", "Cantabria", "La Rioja", "Ceuta", "Melilla"]

  private model: Persona = {id:undefined, name: undefined, city: undefined, age: undefined, phone: undefined, province: "Select Community"};

  constructor(public personaService:PersonaServiceService, public userService:UserServiceService, private toastController: ToastController, private modalController: ModalController) {
    personaService.getAll().subscribe(data=>{
      this.people = data;
      this.searchPeopleList = data;
    });
    userService.getAll().subscribe(data=>{
      this.users = data;
    });

    
    
  }

  customOptions: any = {
    header: 'Communities',
    message: 'Only select your Community '
  };

  async presentToast(message:string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  async presentToastWithOption(id) {
    const toast = await this.toastController.create({
      header: 'Delete',
      message: "Are you sure deleting this person?",
      duration: 5000,
      position: 'bottom',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }, {
          text: 'Delete',
          role: 'success',
          handler: () => {
            console.log('Delete clicked');
            this.deleteItem(id);
          }
        }
      ]
    });
    toast.present();
  }
   
  deleteItem(id:number){
    console.log(id);
    this.personaService.deleteItem(id).subscribe(data=>{
      this.people = data;
    });
  }

  addItem(){
    console.log(this.model);
    this.personaService.addItem(this.model).subscribe(data=>{
      this.people = data;
    });
  }

  async showItem(person) {
    console.log(person);
    const modal = await this.modalController.create({
      component: ModalInfoComponent,
      cssClass: 'modal-custom',
      componentProps: {
        'itemInfo': person,
      }
    });
    return await modal.present();
  } 

  async editItem(person){
    console.log(person);
    
    const modal = await this.modalController.create({
      component: ModalEditComponent,
      cssClass: 'modal-custom',
      componentProps: {
        'itemInfo': person,
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data.person);

    if(data.person){
      this.personaService.editItem(data.person).subscribe(data=>{
        this.people = data;
      });
    }else{
      this.personaService.getAll().subscribe(data=>{
        this.people = data;
      });
    }
  }

  //solucion temporal para solucionar error en el select
  resetForm(){
    this.model = {id:undefined, name: undefined, city: undefined, age: undefined, phone: undefined, province: "Select Community"};
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

interface User {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  password: string;
  rol: string;
}
