import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const endpoint = 'http://localhost:3000/obtener_planeacion/tk1';

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})

export class TableComponent implements OnInit{
    products: any;
    constructor(private http: HttpClient) {
    }
    ngOnInit(){
       this.getProducts();
    }
    getProducts(){
        return this.http.get(endpoint).subscribe(apiData => (this.products = apiData));
    }
}
