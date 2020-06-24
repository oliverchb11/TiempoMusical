import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';


interface DataP {
  idDoc?: string;
  tipo: string;
  instrumento: string;
  estudio: string;
  descripcion: string;
  duracion: string;
  segundos: number;
  fecha: Date;
}


@Component({
  selector: 'app-practicar',
  templateUrl: './practicar.page.html',
  styleUrls: ['./practicar.page.scss'],
})
export class PracticarPage implements OnInit {

  datosPList = [];
  DataP: DataP;
  practicar: FormGroup;
  iduser
  timeInSeconds: any;
  time: any;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  remainingTime: any;
  displayTime: string;

  public tipo: Observable<any[]>;
  public instrumentos: Observable<any[]>;
  public estudiarhoy: Observable<any[]>;

  constructor( public db: AngularFirestore, 
              public fb: FormBuilder,
              private firebaseService: FirebaseService,
              public alertController: AlertController,
              public navCtrl: NavController,
              public auth0:AuthService
              ) 
  {

    this.tipo = db.collection('tipo', ref => ref.orderBy('descripcion')).valueChanges();    
    this.instrumentos = db.collection('instrumentos', ref => ref.orderBy('nombre')).valueChanges(); 
    this.estudiarhoy = db.collection('estudiarhoy').valueChanges();

    this.DataP = {} as DataP;
  }  

  // seleccionarTipoInstrumento(event: string){
  //   let refTipo = this.db.collection('tipo').doc(event);
  //   this.instrumentos = this.db.collection('instrumentos', ref => ref.orderBy('nombre')).valueChanges(); 
  //   this.db.collection('instrumentos', ref => ref.where('tipoID', '==', refTipo.ref));
    
  //   this.instrumentos.snapshotChanges().subscribe(customerList => {
  //     this.instrumentos = customerList.map(item => {
  //       return {
  //         idDoc: item.payload.doc.id,
  //         nombre: item.payload.doc.data().nombre,
  //         tipoID: item.payload.doc.data().tipoID
  //       }
  //     })
  //   })
  // }

  ngOnInit(){   


    this.auth0.getUser$().subscribe((data)=>{
      this.iduser = data.sub;
    })

    this. startTimer(); 
    this.initTimer();

    this.practicar = this.fb.group({
      tipo:         ['', [Validators.required]],
      instrumentos: ['', [Validators.required]],
      estudiar:     ['', [Validators.required]],
      descripcion:  ['', [Validators.required]],
    })

    this.firebaseService.read_datePract().subscribe(data => {
   
    
        this.datosPList = data.map(e => {
          return {
            id: e.payload.doc.id,
            tipo: e.payload.doc.data()['tipo'],
            instrumento: e.payload.doc.data()['instrumento'],
            estudiar: e.payload.doc.data()['estudiar'],
            descripcion: e.payload.doc.data()['descripcion'],
          };
        })
        console.log(this.datosPList);
    });
  }
  

 

  async CreateRecord() {
    if(this.practicar.valid){
      console.log(this.practicar.value);
      const duracion = this.displayTime;
      this.firebaseService.create_datePract(this.practicar.value, duracion, new Date(),this.iduser).then(resp => {
      this.practicar.reset();
    }).catch(error => {
        console.log(error);
      }).then(async newItem => {
        this.initTimer();
        console.log('La clase se ha Guardado exitosamente');
        const alert = await this.alertController.create({
          header: 'Confirmación',
          message: 'Guardado exitosamente',
          buttons: [
            {
              text: 'Aceptar',
              role: 'Ok',
               handler: () => {
                this.navCtrl.navigateRoot('/practicar');
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

  initTimer() {
    if (!this.timeInSeconds) { 
      this.timeInSeconds = 0; 
    }
  
    this.time = this.timeInSeconds;
    this.runTimer = false;
    this.hasStarted = false;
    this.hasFinished = false;
    this.remainingTime = this.timeInSeconds;
    
    this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
  }

  startTimer() {
     this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }
   
  pauseTimer() {
    this.runTimer = false;
  }
  
  finishedTimer() {
    this.runTimer = false;
    this.hasStarted = false;
    this.showConfirm();
  }

  resumeTimer() {
    this.startTimer();
  }
  
  timerTick() {
    setTimeout(() => {  
      if (!this.runTimer) { return; }
      this.remainingTime++;
      this.displayTime = this.getSecondsAsDigitalClock(this.remainingTime);
      if (this.remainingTime > 0) {
        this.timerTick();
      }
      else {
        this.hasFinished = true;
      }
    }, 1000);
  }
  
  getSecondsAsDigitalClock(inputSeconds: number) {
    var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
    var hours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);
    var hoursString = '';
    var minutesString = '';
    var secondsString = '';
    hoursString = (hours < 10) ? "0" + hours : hours.toString();
    minutesString = (minutes < 10) ? "0" + minutes : minutes.toString();
    secondsString = (seconds < 10) ? "0" + seconds : seconds.toString();
    return hoursString + ':' + minutesString + ':' + secondsString;
  }

  async showConfirm() {
    const confirm = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Desea guardar la practica?',
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

