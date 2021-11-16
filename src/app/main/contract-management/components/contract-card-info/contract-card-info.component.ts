import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contract-card-info',
  templateUrl: './contract-card-info.component.html',
  styleUrls: ['./contract-card-info.component.less']
})
export class ContractCardInfoComponent implements OnInit {
  icon = `../../../../../assets/tmp/img/avatar.jpg`;
  constructor() { }

  ngOnInit(): void { }
}
