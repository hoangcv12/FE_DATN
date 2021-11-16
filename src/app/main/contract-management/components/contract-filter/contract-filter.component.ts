import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-contract-filter',
  templateUrl: './contract-filter.component.html',
  styleUrls: ['./contract-filter.component.less']
})
export class ContractFilterComponent implements OnInit {
  @Output() filter = new EventEmitter<boolean>();

  showFilter() {
    this.filter.emit(false);
  }
  constructor() { }

  ngOnInit(): void { }
}
