import { Component } from '@angular/core';
import { ModalEditComponent } from '../modal-edit/modal-edit.component';
import { ModalInfoComponent } from './../modal-info/modal-info.component';
import { ToastController, ModalController } from '@ionic/angular';
import { PersonaServiceService } from '../services/persona-service.service';
import { UserServiceService } from '../services/user-service.service';
import { AuthenticationService } from '../services/authentication.service';
import { Persona } from '../models/persona';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  private people: Persona[];
  private loggedUser:any;
  private selectedPerson:Persona;
  private searchPeopleList:Persona[];
  private cols: any[];
  private data:any;
  private provincesDrop:any[]
  private dataChart = [];
  private provinces:string[]=["Andalusia", "Catalonia", "Community of Madrid", "Valencian Community", "Galicia", "Castile and León", "Basque Autonomous Community",
   "Castilla-La Mancha", "Canary Islands", "Region of Murcia", "Aragon", "Extremadura", "Balearic Islands", "Principality of Asturias", "Community of Navarre", "Cantabria", "La Rioja", "Ceuta", "Melilla"]

  private model: Persona = {id:undefined, name: undefined, city: undefined, age: undefined, phone: undefined, province: "Select Community"};

  constructor(public personaService:PersonaServiceService, public userService:UserServiceService, private toastController: ToastController, 
    private modalController: ModalController, private authService:AuthenticationService) {
    personaService.getAll().subscribe(data=>{
      this.people = data;
      this.searchPeopleList = data;
      this.getData_ForPerson_PerCapital();

    });

    this.cols = [
      { field: 'name', header: 'Nane' },
      { field: 'age', header: 'Age' },
      { field: 'province', header: 'Province' },
      { field: 'city', header: 'City' },
      { field: 'phone', header: 'Number' }
    ];

    this.provincesDrop = [
      { label: 'Andalusia', value: 'Andalusia' },
      { label: 'Catalonia', value: 'Catalonia' },
      { label: 'Community of Madrid', value: 'Community of Madrid' },
      { label: 'Valencian Community', value: 'Valencian Community' },
      { label: 'Galicia', value: 'Galicia' },
      { label: 'Castile and León', value: 'Castile and León' },
      { label: 'Basque Autonomous Community', value: 'Basque Autonomous Community' },
      { label: 'Castilla-La Mancha', value: 'Castilla-La Mancha' },
      { label: 'Canary Islands', value: 'Canary Islands' },
      { label: 'Region of Murcia', value: 'Region of Murcia' },
      { label: 'Aragon', value: 'Aragon' },
      { label: 'Extremadura', value: 'Extremadura' },
      { label: 'Balearic Islands', value: 'Balearic Islands' },
      { label: 'Principality of Asturias', value: 'Principality of Asturias' },
      { label: 'Community of Navarre', value: 'Community of Navarre' },
      { label: 'Cantabria', value: 'Cantabria' },
      { label: 'La Rioja', value: 'La Rioja' },
      { label: 'Ceuta', value: 'Ceuta' },
      { label: 'Melilla', value: 'Melilla' },
    ];

    this.data = {
      labels: this.provinces,
      datasets: [
          {
              label: 'Registered people per Capital',
              backgroundColor: '#42A5F5',
              borderColor: '#1E88E5',
              data: this.dataChart
          }
      ]
  };

    this.loggedUser = authService.currentUserValue;
    //console.log(this.loggedUser);    
  }

  getData_ForPerson_PerCapital(){
    
    var provincesDataObject: {name:string, number:number}[] = [];
    this.provinces.forEach(element=>{
      var object = {name: element, number:0};
      provincesDataObject.push(object);
    })

    this.people.forEach(person=>{
      provincesDataObject.forEach(provinces=>{
        if(person.province==provinces.name){
          provinces.number+=1;
        }
      })
    });

    provincesDataObject.forEach(element => {
      this.dataChart.push(element.number);
    });

    //console.log(provincesDataObject);
    //console.log(this.dataChart);
    
    return this.dataChart;
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

  async presentToastWithOption(id, personToDelete) {
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
            this.deleteItem(id, personToDelete);
          }
        }
      ]
    });
    toast.present();
  }
   
  deleteItem(id:number, personToDelete){
    console.log(id);
    this.personaService.deleteItem(id).subscribe(data=>{
        var index = this.people.indexOf(personToDelete, 0);        
        if (index > -1) {
          this.people.splice(index, 1);
        }
    });
  }

  addItem(){
    console.log(this.model);
    this.personaService.addItem(this.model).subscribe(data=>{
      this.people.push(data);
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

  async editItem(id, person){
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
      this.personaService.editItem(id, data.person).subscribe(data=>{});
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