import { Component, ViewChild, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { FirebaseService } from '../../services/firebase.service';

import { ChartDataSets, ChartOptions,ChartType , Chart} from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import * as pluginDataLabels from 'ng2-charts';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { DatosClases } from '../../model/DatosClase.model';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage  implements OnInit    {
  chart : Chart[] = [] ;
  prueba:number[];
  prueba2:string;
  prueba3:string[];
  instrumentos:string;
  results: any[] = [];
  dato = {};
  botones:any[]=[];
  fechaJ = 'junio';
 estEscalas:boolean;
 validadorEscalas:string;
 estObras:boolean;
 estImprovisacion:boolean;
 estEstudios:boolean;
 fechaT:any;
constructor(private firebaseService: FirebaseService) {}
ngOnInit(){

  this.firebaseService.estudiarHoy().subscribe(data=>{
    this.botones = data;
    console.log(data);
  })

}




obras() {
this.chart[''] = new Chart('canvas',{
    type: 'bar',
    data:{
      labels: [0],
      datasets: [
        {
          label: 'Obras',
          data: [0]
        }
      ]
    }
  });

}

improvisacion() {
this.chart[''] = new Chart('canvas', {
    type: 'bar',
    data: {
      labels: [0],
      datasets: [
        {
          label: 'Improvisacion',
          data: [0]
        }
      ]
    }
  });

}


estudios() {
  this.chart[''] = new Chart('canvas',{
    type: 'bar',
    data:{
      labels: [0],
      datasets: [
        {
          label: 'Estudios',
          data: [0]
        }
      ]
    }
  });
}


escalas() {
  this.estEscalas = true;
  this.firebaseService.dataFirebase$().subscribe((data)=>{
      this.validadorEscalas = data[0].record.estudiar;
    // tslint:disable-next-line: align
    //   const fecha = data[0].fecha;
    //   this.fechaT = fecha;
    //   console.log(this.fechaT);
    //   // tslint:disable-next-line: radix
    //   const dateF = parseInt(this.fechaT);
    //   console.log(dateF);
    //   const fechaTotal = new Date(dateF * 1000).toISOString();
    //   // tslint:disable-next-line: radix
    //   const fechaNumero = fechaTotal.substr(5, 2);
    // // tslint:disable-next-line: align
    // if(fechaNumero === '06'){
    //  // tslint:disable-next-line: no-unused-expression
    //  this.fechaJ;
    // }
        // objeto
      this.dato = {
        label: data[0].record.instrumentos,
        data: [data[0].duracion],
        backgroundColor: 'red',
        borderColor: 'red',
        fill: false,
        };
        // grafico
      this.chart[''] = new Chart('canvas', {
        type: 'bar',
        data: {
        labels: ['junio'],
        datasets: [this.dato]
      }
    });

  });

}
}
