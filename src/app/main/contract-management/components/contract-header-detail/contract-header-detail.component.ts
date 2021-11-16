import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contract-header-detail',
  templateUrl: './contract-header-detail.component.html',
  styleUrls: ['./contract-header-detail.component.less']
})
export class ContractHeaderDetailComponent implements OnInit {
  @Input()
  title: number = 0;
  @Input() termination: boolean = false;
  code: string = '';
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.code = params.code;
    });
  }
}
