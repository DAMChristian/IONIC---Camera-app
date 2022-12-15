
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Expediente } from './expediente';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { SQLitePorter } from '@awesome-cordova-plugins/sqlite-porter/ngx';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
@Injectable({
  providedIn: 'root'
})
export class DbService {
  private storage: SQLiteObject;
  expedientesList = new BehaviorSubject<Expediente[]>([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform, 
    private sqlite: SQLite, 
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
  ) {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'MobileSQLITE.db',
        location: 'default'
      })
      .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
      });
    });
  }
  dbState() {
    return this.isDbReady.asObservable();
  }
 
  fetchExpedientes(): Observable<Expediente[]> {
    return this.expedientesList.asObservable();
  }
    // Render fake data
    getFakeData() {
      this.httpClient.get(
        'assets/dump.sql', 
        {responseType: 'text'}
      ).subscribe(data => {
        this.sqlPorter.importSqlToDb(this.storage, data)
          .then(_ => {
            this.getExpedientes();
            this.isDbReady.next(true);
          })
          .catch(error => console.error(error));
      });
    }
  // Get list
  getExpedientes(){
    return this.storage.executeSql('SELECT * FROM expediente', []).then(res => {
      let items: Expediente[] = [];
      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) { 
          items.push({ 
            id: res.rows.item(i).id,
            exp: res.rows.item(i).exp,  
            exp_name: res.rows.item(i).exp_name
           });
        }
      }
      this.expedientesList.next(items);
    });
  }
  // Add
  addExpediente(exp: string, exp_name: string) {
    let data = [exp, exp_name];
    return this.storage.executeSql('INSERT INTO expediente (exp, exp_name) VALUES (?, ?)', data)
    .then(res => {
      this.getExpedientes();
    });
  }
 
  // Get single object
  getExpediente(id: number): Promise<Expediente> {
    return this.storage.executeSql('SELECT * FROM expediente WHERE id = ?', [id]).then(res => { 
      return {
        id: res.rows.item(0).id,
        exp: res.rows.item(0).exp,  
        exp_name: res.rows.item(0).exp_name
      }
    });
  }
  // Update
  updateExpediente(id: number, expediente: Expediente) {
    let data = [expediente.exp, expediente.exp_name];
    return this.storage.executeSql(`UPDATE expediente SET exp = ?, exp_name = ? WHERE id = ${id}`, data)
    .then(data => {
      this.getExpedientes();
    })
  }
  // Delete
  deleteExpediente(id: number) {
    return this.storage.executeSql('DELETE FROM expediente WHERE id = ?', [id])
    .then(_ => {
      this.getExpedientes();
    });
  }
}