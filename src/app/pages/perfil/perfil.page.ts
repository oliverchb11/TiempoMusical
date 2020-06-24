import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFirestoreCollection, AngularFirestoreModule } from 'angularfire2/firestore';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { FirebaseService } from 'src/app/services/firebase.service';
import { Ciudad } from '../../model/Ciudad.model';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { DatosPer } from '../../model/DatosPer.model';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  ciudad1:string
  deprtamento1:string;
  genero1:string;
  instrumentos1:string;
  pais1:string;
  tipo1:string;
  //
  iduser:string;
  preguntaId:string;
emails:string
  profileList = [];
  vector: string [] = [];
  formdatosper: FormGroup;
  prueba:boolean;
  username: string;
  usermail: string;
  foto:string;
  registrado:boolean;
  imprimirdata:any[]=[];
  objecto={};
completado:boolean;
  exite = false;
  public tipo: Observable<any[]>;
  public instrumentos: Observable<any[]>;

  public pais: Observable<any[]>;
  public departamento: Observable<any[]>;
  public ciudad: Observable<any[]>;

  constructor( public auth: AuthService,
               private db: AngularFirestore,
               public fb: FormBuilder,
               private firebaseService: FirebaseService,
               public alertController: AlertController,
               public navCtrl: NavController) {

     this.tipo = db.collection('tipo', ref => ref.orderBy('descripcion')).valueChanges();    
     this.instrumentos = db.collection('instrumentos', ref => ref.orderBy('nombre')).valueChanges();   

     this.pais = db.collection('Pais', ref => ref.orderBy('NombrePais')).valueChanges();  
     this.departamento = db.collection('Departamento', ref => ref.orderBy('NomDepart')).valueChanges(); 
     this.ciudad = db.collection('Ciudad', ref => ref.orderBy('NomCiudad')).valueChanges(); 
  }

  ngOnInit() {
    
      
    this.formdatosper = this.fb.group({
      tipo:         ['', [Validators.required]],
      instrumentos: ['', [Validators.required]],
      fechanac:     ['', [Validators.required]],
      gender:       ['', [Validators.required]],
      pais:         ['', [Validators.required]],
      depart:       ['', [Validators.required]],
      ciudad:       ['', [Validators.required]],
    })

    //prueba
    this.firebaseService.dataPersona$().subscribe((data)=>{
        console.log('data collection dataper',data)
      

          // tslint:disable-next-line: prefer-for-of
          for(let i = 0; i < data.length; i++){
            this.emails = data[i].email;
            console.log(this.vector.push(this.emails));
        }
          this.vector = [... new Set(this.vector)];
          this.auth.getUser$().subscribe(
          (datas) => {
            if (data !== null) {
            this.username = datas.name;
            this.usermail = datas.email;
            this.foto = datas.picture;
            this.iduser = datas.sub;
         
              // tslint:disable-next-line: prefer-for-of
            for(let x = 0; x < this.vector.length;x++){
              if(this.vector[x]===this.usermail){
                  this.registrado = true;
                  this.exite = true;
                  if(this.registrado){
                      this.prueba = true;
                    }else{
                    this.prueba = false;
                  }

                }else{
                  this.exite = false;
                }
              }
            }
         
            const auth = datas.sub
            for (let y =0; y <data.length;y++){
             this.preguntaId = data[y].iduser;
             console.log(this.preguntaId)
             if(this.preguntaId === auth){
               console.log('verdadero',y);  
               this.pais1 = data[y].record.pais;
               this.ciudad1 = data[y].record.ciudad;
               this.deprtamento1 = data[y].record.depart;
               this.instrumentos1 = data[y].record.instrumentos;
               this.tipo1 = data[y].record.tipo
               this.genero1 = data[y].record.gender;
             }else{
              console.log('falso');
             }
            }
        });

        

  })
    this.firebaseService.read_datePersona().subscribe(data => {
     data.map(e => {
   
   
      this.objecto = {
        id:            e.payload.doc.id,
        isEdit:        false,
        Name:          e.payload.doc.data()['Name'],
        email:         e.payload.doc.data()['email'],
        tipo:          e.payload.doc.data()['tipo'],
        instrumento:   e.payload.doc.data()['instrumento'],
        fechanac:      e.payload.doc.data()['fechanac'],
        gender:        e.payload.doc.data()['gender'],
        pais:          e.payload.doc.data()['pais'],
        depart:        e.payload.doc.data()['depart'],
        ciudad:        e.payload.doc.data()['ciudad'],
      };

     
    })
   
  });
  

  }


  async CreateRecord() {
    if(this.formdatosper.valid){
      console.log(this.formdatosper.value);
      this.firebaseService.create_datePerso(this.formdatosper.value, this.username, this.usermail, new Date(),this.iduser).then(resp => {
      this.formdatosper.reset();
    }).catch(error => {
        console.log(error);
      }).then(async newItem => {
        console.log('Tus datos han  sido guardado correctamente');
        const alert = await this.alertController.create({
          header: 'Confirmación',
          message: 'Guardado exitosamente',
          buttons: [
            {
              text: 'Aceptar',
              role: 'Ok',
               handler: () => {
                //this.navCtrl.navigateRoot('/practicar');
               }
            }]
        });      
        await alert.present();
      }).catch(error => {
        this.registroErroneo(error);
        console.log(error);
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Alerta',
        message: 'Ingrese los campos obligatorios',
        buttons: ['Cerrar']
      });
      await alert.present();
    }
  }

  async registroErroneo(error: any) {
      const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Ocurrido un error al ingresar ' + error,
      buttons: ['Cerrar']
    });
      await alert.present();
  }

  async showConfirm() {
    const confirm = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea guardar tus datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('cancelar');
          }
        },
        {
          text: 'Guardar',
          handler: () => {
            this.CreateRecord(),
            console.log('guardar datos');
          }
        }
      ]
    });
    await confirm.present();
  }
}


