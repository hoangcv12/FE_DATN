import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contract-header-base',
  templateUrl: './contract-header-base.component.html',
  styleUrls: ['./contract-header-base.component.less']
})
export class ContractHeaderBaseComponent implements OnInit {
  @Output() filter = new EventEmitter<boolean>();
  @Input() termination: boolean = true;
  @Input() titleHeader: string = '';
  showFilter() {
    this.filter.emit(true);
  }

  constructor() { }

  ngOnInit(): void { }
}
