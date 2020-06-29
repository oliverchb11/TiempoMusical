import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { ChartDataSets, ChartOptions,ChartType , Chart} from 'chart.js';
import { Label } from 'ng2-charts';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-estadisticas',
  templateUrl: './estadisticas.page.html',
  styleUrls: ['./estadisticas.page.scss'],
})
export class EstadisticasPage  implements OnInit    {
  array = new Array();
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
 suma=0;
 division:number;
 entera:number;
 variableN=0;
 guardarSegundos:number;
 resi:number;
 sumresi=0; 
 summin = 0;
 totalSeg:number;
 totalisimo=0;
 supertotal : number;
 superTotalizimo:number;
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
               let num = parseInt( this.duracionOE)//
               this.division = (num) 
              }else{}
              if (this.division > 59 ){
                this.entera = (this.division/100)
                this.variableN = parseInt( this.entera.toString());
                this.resi = this.division-(this.variableN * 100);
                this.sumresi = this.sumresi + this.resi
                this.summin = this.summin + this.variableN
                console.log( 'min',this.summin, 'suma resi', this.sumresi)
                    
                  }else{
                      this.suma = this.suma + this.division;
                      console.log( 'suma else',this.suma);
                      
                  }
      
                }else{}
        }
              this.totalisimo = (this.summin * 60) + this.sumresi + this.suma;
      console.log( 'totalizomo',  this.totalisimo);
      this.superTotalizimo = this.totalisimo / 60;
      console.log( 'super',  this.superTotalizimo);
              //objeto
          this.dato = {
          data: [this.superTotalizimo],
          label: [this.instrumentoOE],
          backgroundColor:' #ffc578',
          };
                // grafico
                this.barChartData = [
                  this.dato
                ]
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
                let num = parseInt( this.duracionI)//
                this.division = (num) 
               }else{}
               if (this.division > 59 ){
                this.entera = (this.division/100)
                this.variableN = parseInt( this.entera.toString());
                this.resi = this.division-(this.variableN * 100);
                this.sumresi = this.sumresi + this.resi
                this.summin = this.summin + this.variableN
                console.log( 'min',this.summin, 'suma resi', this.sumresi)
                    
                  }else{
                      this.suma = this.suma + this.division;
                      console.log( 'suma else',this.suma);
                      
                  }

              }else{}
      }
      this.totalisimo = (this.summin * 60) + this.sumresi + this.suma;
      console.log( 'totalizomo',  this.totalisimo);
      this.superTotalizimo = this.totalisimo / 60;
      console.log( 'super',  this.superTotalizimo);
          //objeto
          this.dato = {
           data: [this.superTotalizimo],
           label: [ this.instrumentoI],
           backgroundColor:'#b4ddb4',
          };
          // grafico
            this.barChartData = [
            this.dato
             ]
  });
}
estudios() {
  this.estEstudios = true;
  this.auths.getUser$().subscribe(data=>{
    this.auth = data.sub;
  });
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
                let num = parseInt( this.duracionEst)//
                this.division = (num) 
               }else{}
               if (this.division > 59 ){
                this.entera = (this.division/100)
                this.variableN = parseInt( this.entera.toString());
                this.resi = this.division-(this.variableN * 100);
                this.sumresi = this.sumresi + this.resi
                this.summin = this.summin + this.variableN
                console.log( 'min',this.summin, 'suma resi', this.sumresi)
                    
                  }else{
                      this.suma = this.suma + this.division;
                      console.log( 'suma else',this.suma);
                      
                  }
  
    
              }else{}
      }
      this.totalisimo = (this.summin * 60) + this.sumresi + this.suma;
    console.log( 'totalizomo',  this.totalisimo);
    this.superTotalizimo = this.totalisimo / 60;
    console.log( 'super',  this.superTotalizimo);

    this.dato = {
      data: [this.superTotalizimo],
      label: [this.instrumentoEst],
      backgroundColor:'#4096ee',
    };
      // grafico
      this.barChartData = [
        this.dato
      ]

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
              const duracionEs = dur.replace(':','')
              const estudiar = data[x].record.estudiar;
              if(estudiar === " Escalas "){
              this.instrumentoEsc =  data[x].record.instrumentos
              this.duracionEsc = duracionEs;
              let num = parseInt( this.duracionEsc)//
              console.log('oli',num);
               //   this.suma = this.suma 
            this.division = (num) 
            }else{}
              //objeto
            //   console.log(this.division);
            // debugger;
            if (this.division > 59 ){
              this.entera = (this.division/100)
              this.variableN = parseInt( this.entera.toString());
              this.resi = this.division-(this.variableN * 100);
              this.sumresi = this.sumresi + this.resi
              this.summin = this.summin + this.variableN
              console.log( 'min',this.summin, 'suma resi', this.sumresi)
                  
                }else{
                    this.suma = this.suma + this.division;
                    console.log( 'suma else',this.suma);
                    
                }

              }else{}
    }
    this.totalisimo = (this.summin * 60) + this.sumresi + this.suma;
    console.log( 'totalizomo',  this.totalisimo);
    this.superTotalizimo = this.totalisimo / 60;
    console.log( 'super',  this.superTotalizimo);
                  //objeto
                  this.dato1 = {
                    data: [ this.superTotalizimo],
                    label: [this.instrumentoEsc],
                    backgroundColor:'#a90329',
                  };
                  // grafico
                    this.barChartData = [
                      this.dato1
                    ]
  });
  }
}




//actualizacion 06/28/200 8<43