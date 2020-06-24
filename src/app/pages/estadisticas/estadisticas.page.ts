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
import { AuthService } from '../../services/auth.service';



@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage  implements OnInit    {

  objetoData={};
  auth:any;
  chart : Chart  ;
  prueba:number[];
  prueba2:string;
  prueba3:string[];
  instrumentos:string;
  results: any[] = [];
  dato = {};
  dato1 = {};
  botones:any[]=[];
  fechaJ = 'junio';
 estEscalas:boolean;
 validadorEscalas:string;
 estObras:boolean;
 estImprovisacion:boolean;
 estEstudios:boolean;
 fechaT:any;
 regla:boolean;
 instrumentoOE:string;
 instrumentoI:string;
 instrumentoEst:string;
 instrumentoEsc:string;
 duracionOE:string;
 duracionI:string;
 duracionEst:string;
 duracionEsc:string;
constructor(private firebaseService: FirebaseService, public auths :AuthService) {}
ngOnInit(){

  this.firebaseService.estudiarHoy().subscribe(data=>{
    this.botones = data;
    console.log(data);
  })


}

////////////////////grafico

public barChartOptions: ChartOptions = {
  responsive: true,
};
public barChartLabels: Label[] = ['junio'];
public barChartType: ChartType = 'bar';
public barChartLegend = true;
public barChartPlugins = [];

public barChartData: ChartDataSets[] = [
  { data: [], label: '' }
];

////////////////////fin grafico
obras() {
  this.estObras = true;
  this.auths.getUser$().subscribe(data=>{
    this.auth = data.sub;
  
  })
  this.firebaseService.dataFirebase$().subscribe((data)=>{
        for(let x=0; x<data.length;x++){
            const idUser = data[x].iduser
            if(idUser === this.auth){
             const dur = data[x].duracion.replace(':','');
             const duracion = dur.replace(':','')
             const estudiar = data[x].record.estudiar;
 
              if(estudiar === " Obras o estándar "){
         
               this.instrumentoOE =  data[x].record.instrumentos;
               this.duracionOE = duracion;
              }else{
            
              }
              //objeto
              this.dato = {
                data: [this.duracionOE],
                label: [this.instrumentoOE],
                backgroundColor:' #ffc578',
                
                };
                // grafico
                this.barChartData = [
                  this.dato
                ]
                }else{}
  
          }
  });


  

}






improvisacion() {
  this.estImprovisacion = true;
  this.auths.getUser$().subscribe(data=>{
    this.auth = data.sub;

  })

  
  this.firebaseService.dataFirebase$().subscribe((data)=>{
  
          
          for(let x=0; x<data.length;x++){
            const idUser = data[x].iduser
            if(idUser === this.auth){
              const dur = data[x].duracion.replace(':','');
              const duracion = dur.replace(':','')
              const estudiar = data[x].record.estudiar;
        
               if(estudiar === " Improvisación "){
           
                this.instrumentoI =  data[x].record.instrumentos;
                this.duracionI = duracion;
               }else{
            
               }
               //objeto
              this.dato = {
                data: [this.duracionI],
                label: [ this.instrumentoI],
                backgroundColor:'#b4ddb4',
              };
                // grafico
                this.barChartData = [
                  this.dato
                ]

            }else{
            
              
             
              
            }

          }
    
 
      
    
 

  });

}


estudios() {
  this.estEstudios = true;
  this.auths.getUser$().subscribe(data=>{
    this.auth = data.sub;

  })

  
  this.firebaseService.dataFirebase$().subscribe((data)=>{
  
          
          for(let x=0; x<data.length;x++){
            const idUser = data[x].iduser
            if(idUser === this.auth){
              const dur = data[x].duracion.replace(':','');
              const duracion = dur.replace(':','')
              const estudiar = data[x].record.estudiar;
    
               if(estudiar === " Estudios "){
                
                this.instrumentoEst =  data[x].record.instrumentos;
                this.duracionEst = duracion;
               }else{
           
               }
              this.dato = {
                data: [this.duracionEst],
                label: [this.instrumentoEst],
                backgroundColor:'#4096ee',
              };
                // grafico
                this.barChartData = [
                  this.dato
                ]

            }else{
           
           
           
           
            }

          }
    
 
      
    
 

  });
}


escalas() {
  this.estEscalas = true;
  this.auths.getUser$().subscribe(data=>{
    this.auth = data.sub;

  })


  this.firebaseService.dataFirebase$().subscribe((data)=>{
  
          
          for(let x=0; x<data.length;x++){
            const idUser = data[x].iduser
            if(idUser === this.auth){
              const dur = data[x].duracion.replace(':','');
              const duracion = dur.replace(':','')
              const estudiar = data[x].record.estudiar;
       
               if(estudiar === " Escalas "){
                
              this.instrumentoEsc =  data[x].record.instrumentos
              this.duracionEsc = duracion;
               }else{
               
               }
              //objeto
              this.dato = {
                data: [ this.duracionEsc],
                label: [this.instrumentoEsc],
                backgroundColor:'#a90329',
              };
    
                // grafico
                this.barChartData = [
                  this.dato
                ]

            }else{
           
      
              
            
            }

          }
    
 
      
    
 

  });

}
}
