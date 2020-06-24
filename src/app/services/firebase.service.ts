import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatosClases } from '../model/DatosClase.model';
import { DatosPer } from '../model/DatosPer.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  [x: string]: any;

  collectionName = 'datosClases';
  collectionNameP = 'datosPers';
  collectionestudiarHoy = 'estudiarhoy';


  constructor(
    private firestore: AngularFirestore
  ) { }

  create_datePract(record: any, duracion: string, fecha: Date ,iduser:string) {
    return this.firestore.collection(this.collectionName).add({record, duracion, fecha,iduser});
  }
  read_datePract() {
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
  create_datePerso(record: any, name: String, email: string, fecha: Date ,iduser :string) {
    return this.firestore.collection(this.collectionNameP).add({record, name, email, fecha, iduser});
  }
  read_datePersona() {
    return this.firestore.collection(this.collectionNameP).snapshotChanges();
  }

  public consultar(coleccion: any) {
    return this.angularFirestore.collection(coleccion).snapshotChanges();
  }




  read_datePersona2() {
    return this.firestore.collection(this.collectionNameP).valueChanges();
  }

estudiarHoy(){
  return this.firestore.collection(this.collectionestudiarHoy).valueChanges();
}
  escalas$(){
    return this.firestore.collection(this.collectionName).valueChanges();
  }
  dataFirebase$(){
    return this.firestore.collection<DatosClases>(this.collectionName).valueChanges();
  }
dataPersona$(){
  return this.firestore.collection<DatosPer>(this.collectionNameP).valueChanges({idField: 'id'});
}


}