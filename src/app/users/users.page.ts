import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { ToastController, ModalController } from '@ionic/angular';
import { AuthenticationService } from '../services/authentication.service';
import { ConfirmationService } from 'primeng/api';
import { ModalEditUserComponent } from '../modal-edit-user/modal-edit-user.component';
import { User } from '../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  private users: User[];
  private loggedUser:any;

  private model:User = {id:undefined, firstname:undefined, lastname:undefined, username:undefined, password:undefined, rol:undefined};

  private roles:string[]=["Admin", "Default"];
  
  constructor(public userService:UserServiceService, private toastController: ToastController, 
    private modalController: ModalController, private authService:AuthenticationService, private confirmationService: ConfirmationService) {

      userService.getAll().subscribe(data=>{
        this.users = data;
      });
  
      this.loggedUser = authService.currentUserValue;
    }

  ngOnInit() {
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

  addItem(){
    console.log(this.model);
    this.userService.addItem(this.model).subscribe(data=>{
      console.log(data);
      console.log(this.users);
      
      this.users.push(data);
    });
  }

  confirmDelete(id:number, userToDelete) {
    this.confirmationService.confirm({
        message: 'Are you sure that you want to delete?',
        accept: () => {
          this.userService.deleteItem(id).subscribe(data=>{
              var index = this.users.indexOf(userToDelete, 0);
              if (index > -1) {
                this.users.splice(index, 1);
              }

          });
        }
    });
  }

  async editItem(id:number, user){
    console.log(user);
    
    const modal = await this.modalController.create({
      component: ModalEditUserComponent,
      cssClass: 'modal-custom',
      componentProps: {
        'itemInfo': user,
      }
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    console.log(data.user);

    if(data.user){
      console.log("Editing " + id);
      
      this.userService.editItem(id, data.user).subscribe(res=>{});
    }else{
      this.userService.getAll().subscribe(data=>{
        this.users = data;
      });
    }
  }

  //solucion temporal para solucionar error en el select
  resetForm(){
    this.model = {id:undefined, firstname:undefined, lastname:undefined, username:undefined, password:undefined, rol:undefined};
  }

}

