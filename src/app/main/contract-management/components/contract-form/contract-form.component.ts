import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.less']
})
export class ContractFormComponent implements OnInit {
  @Input() changeForm: boolean = false;
  labelButton: string = '';
  constructor(public activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params.code == undefined) {
        this.labelButton = 'Thêm';
      } else {
        this.labelButton = 'Cập nhật ';
      }
    });
  }
}
