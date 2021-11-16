import { Component, Input, OnInit } from '@angular/core';

import { ContractManagementService } from '../../services/contract-management.service';

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
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrls: ['./contract-table.component.less']
})
export class ContractTableComponent implements OnInit {
  @Input() xScroll: string = '';
  @Input() action?: boolean;
  @Input() typeParams?: string;

  constructor(private contractHttp: ContractManagementService) { }

  contractList: any = [];
  getAllContract(): void {
    this.contractHttp.getAllContract().subscribe(res => {
      this.contractList = res.data;
      console.log(res.responseData);
    });
  }

  ngOnInit(): void {
    this.getAllContract();
    this.listOfData = new Array(50).fill(0).map((_, index) => ({
      id: index,
      code: `HD${index}`,
      name: 'Ngô Đắc Quang Vinh',
      dep: 'Dev',
      title: 'Lập trình viên',
      sign_date: '01-11-2021',
      start_date: '02-11-2021',
      end_date: '02-01-2021',
      type: 'TTS',
      status: 'Đang hiệu lực'
    }));
  }

  nzMenuStyle = { borderRadius: '10px ', border: '1px solid' };
  listOfSelection = [
    {
      text: 'Select All Row',
      onSelect: () => {
        this.onAllChecked(true);
      }
    },
    {
      text: 'Select Odd Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 !== 0));
        this.refreshCheckedStatus();
      }
    },
    {
      text: 'Select Even Row',
      onSelect: () => {
        this.listOfCurrentPageData.forEach((data, index) => this.updateCheckedSet(data.id, index % 2 === 0));
        this.refreshCheckedStatus();
      }
    }
  ];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly ItemData[] = [];
  listOfData: readonly ItemData[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly ItemData[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }
}
