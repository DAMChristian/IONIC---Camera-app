import { Component } from '@angular/core';
import { CamaraService, UserPhoto } from '../../servicio/camara.service';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-galeria',
  templateUrl: 'galeria.html',
  styleUrls: ['galeria.scss']
})
export class Galeria {

  //constructor() {}

  constructor(public photoService: CamaraService,
              public actionSheetController: ActionSheetController) { }

  addFotoAGeleria() {
    this.photoService.addFotoAGaleria();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }

  public async showActionSheet(photo: UserPhoto, position: number) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Photos',
      buttons: [{
        text: 'Delete',
        role: 'destructive',
        icon: 'trash',
        handler: () => {
          this.photoService.deletePicture(photo, position);
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          // Nothing to do, action sheet is automatically closed
          }
      }]
    });
    await actionSheet.present();
  }
}
