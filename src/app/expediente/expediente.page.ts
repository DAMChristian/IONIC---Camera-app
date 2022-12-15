import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { DbService } from '../servicio/db.service';
import { ToastController } from '@ionic/angular';
import { Router } from "@angular/router";

@Component({
  selector: 'app-expediente',
  templateUrl: './expediente.page.html',
  styleUrls: ['./expediente.page.scss'],
})
export class ExpedientePage implements OnInit {
  mainForm: FormGroup;
  Data: any[] = []

  constructor(private db: DbService,
    public formBuilder: FormBuilder,
    private toast: ToastController,
    private router: Router) { }

  ngOnInit() {
    this.db.dbState().subscribe((res) => {
      if(res){
        this.db.fetchExpedientes().subscribe(item => {
          this.Data = item
        })
      }
    });
    this.mainForm = this.formBuilder.group({
      exp: new FormControl('Expediente'),
      exp_name: new FormControl('Nombre')
    })
  }

  storeData() {
    this.db.addExpediente(
      this.mainForm.value.exp,
      this.mainForm.value.exp_name
    ).then((res) => {
      this.mainForm.reset();
    })
  }

  deleteExpediente(id: number){
    this.db.deleteExpediente(id).then(async(res) => {
      let toast = await this.toast.create({
        message: 'Expediente eliminado',
        duration: 2500
      });
      toast.present();      
    })
  }

}
