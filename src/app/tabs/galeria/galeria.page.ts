import { Component } from '@angular/core';
import { CamaraService } from '../../servicio/camara.service';

@Component({
  selector: 'app-galeria',
  templateUrl: 'galeria.html',
  styleUrls: ['galeria.scss']
})
export class Galeria {

  //constructor() {}

  constructor(public photoService: CamaraService) { }

  addFotoAGeleria() {
    this.photoService.addFotoAGaleria();
  }

  async ngOnInit() {
    await this.photoService.loadSaved();
  }
}
