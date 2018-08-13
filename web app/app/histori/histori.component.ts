import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-histori',
  templateUrl: './histori.component.html',
  styleUrls: ['./histori.component.css']
})
export class HistoriComponent implements OnInit {

  page = 1;

  constructor() { }

  ngOnInit() {
    this.page = 1;
  }

}
