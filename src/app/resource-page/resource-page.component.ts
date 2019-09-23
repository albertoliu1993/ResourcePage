import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ResourceList } from '../resource-page/ResourceList';
import { ServiceService } from '../resource-page/service.service';
import { HttpResponse, HttpEventType, HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';

@Component({
  selector: 'app-resource-page',
  templateUrl: './resource-page.component.html',
  styleUrls: ['./resource-page.component.css']
})

export class ResourcePageComponent implements OnInit {

  private items:MenuItem[];
  myResourceList: ResourceList[];
  columnlist: string[] = ['name', 'cost_code'];
  errorMessage: string;
  requestResourceAll = 'http://192.168.1.172:8080/Project1/res/displayResources';

  displayTableAll() {
    this.service.getResourceList(this.requestResourceAll).subscribe(
      (data: ResourceList[]) => {
        this.myResourceList = data;
        this.filteredResourceList = data;
        console.log(this.columnlist);
      },
      (error) => this.errorMessage = error
    );
  }

  //........Search......................
  filteredResourceList: ResourceList[];
  filterwords: string;

  filterByKeyWord() {
    if (!this.filterwords || this.filterwords.replace(/\s/g, '') === '') {
      this.filteredResourceList = this.myResourceList;
    } else {
      this.filteredResourceList = [];
      for (let resSearch of this.myResourceList) {
        if (resSearch.cost_code.search(this.filterwords) >= 0 ||
          resSearch.name.search(this.filterwords) >= 0) {
          this.filteredResourceList.push(resSearch);
        }
      }
    }
  }

  //........Add Row.....................
  displayDialog: boolean;
  resourcelist: ResourceList = {};
  selectedResource: ResourceList;
  newResource: boolean;
  //filteredResourceList: ResourceList[];
  cols: any[];

  addRow(){
    this.showDialogToAdd();
  }

  showDialogToAdd(){
    this.newResource = true;
    this.resourcelist = {};
    this.displayDialog = true;
  }

  save(){
    let filteredResourceList = [...this.filteredResourceList];
    if(this.newResource){
      filteredResourceList.push(this.resourcelist);
    }else{
      filteredResourceList[this.filteredResourceList.indexOf(this.selectedResource)] = this.resourcelist;
    }
    this.filteredResourceList = filteredResourceList;
    this.resourcelist = null;
    this.displayDialog = false;
  }

  delete(){
    let index = this.filteredResourceList.indexOf(this.selectedResource);
    this.filteredResourceList = this.filteredResourceList.filter((val, i) => i != index);
    this.resourcelist = null;
    this.displayDialog = false;
  }

  ///........Import CSV File.....................
  
  displayDialog2 : boolean;
  selectedFile : File;
  dataArr: any;
  transFormData: ResourceList[] = [];

  importCSV(){
    this.displayDialog2 = true;
  }

  changeListener(files : FileList){
    console.log(files);
    if(files && files.length > 0){
      let file : File = files.item(0);
      console.log(file.name);
      console.log(file.size);
      console.log(file.type);
      let reader : FileReader = new FileReader();

      reader.readAsText(file);
      reader.onload = (e) => {
        const csv  = reader.result;
        const results = this.papa.parse(csv as string, {header:false});
        this.dataArr = results.data;
        for(let data of this.dataArr){
          if(data[0] === 'cost_code')continue;
          this.transFormData.push({cost_code: data[0], name: data[1]});
        }
      }
    }
  }
  
  submit() : void{
    console.log(this.transFormData);
    this.service.importCSVFile(this.transFormData).subscribe(res =>{
      console.log(res);
    })
  };


  constructor(private service: ServiceService, private papa: Papa, private httpClient : HttpClient){
    
  }

  ngOnInit(){

    // Display resource list for resource page
    this.displayTableAll(); 

    // Menu options for the button on the up-right corner
    this.items = [
      {label: 'Add Row', icon: 'pi pi-align-left', command: (event) => {this.addRow()}},
      {label: 'Add Column', icon: 'pi pi-table'},
      {label: 'Import CSV', icon: 'pi pi-file-excel', command: (event) => {this.importCSV()}},
    ];

    // Dynamic form display
    this.cols = [
      {field: 'name', header: 'Resource Name'},
      {field: 'cost_code', header: 'Resource Code'}
    ];
  };
}
