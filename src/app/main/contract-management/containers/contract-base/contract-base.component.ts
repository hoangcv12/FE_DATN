import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
interface ItemData {
  id: number;
  code: string;
  name: string;
  dep: string;
  title: string;
  sign_date: string;
  start_date: string;
  end_date: string;
  type: string;
  status: string;
}
@Component({
  selector: 'app-contract-base',
  templateUrl: './contract-base.component.html',
  styles: []
})
export class ContractBaseComponent implements OnInit {
  filter: boolean = false;
  termination: boolean = false;
  titleHeader: string = '';
  action?: boolean;
  typeParams?: string;
  constructor(public activatedRoute: ActivatedRoute) { }
  outputFilter(event: any) {
    this.filter = event;
  }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.type == 'effect') {
        this.typeParams = params.type;
        this.termination = true;
        this.action = true;
        this.titleHeader = 'Hợp đồng còn hiệu lực';
      } else if (params.type == 'expired') {
        this.termination = false;
        this.titleHeader = 'Hợp đồng hết hạn';
        this.action = false;
        this.typeParams = params.type;
      } else {
        this.termination = false;
        this.titleHeader = 'Hợp đồng chấm dứt';
        this.action = false;
        this.typeParams = params.type;
      }
    });
  }

  // ngDoCheck() {
  //   console.log(this.activatedRoute.snapshot.params.type);
  // }
}
