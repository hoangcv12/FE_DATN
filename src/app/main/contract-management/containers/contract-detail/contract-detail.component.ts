import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styles: []
})
export class ContractDetailComponent implements OnInit {
  termination: boolean = false;
  title!: number;
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.type == 'effect') {
        this.termination = true;
        this.title = 0;
      } else {
        this.termination = false;
        this.title = 1;
      }
    });
  }
}
