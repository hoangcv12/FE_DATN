import { filter } from 'rxjs/operators';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Category } from '../../model/category';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category-table',
  templateUrl: './category-table.component.html',
  styles: [
  ]
})
export class CategoryTableComponent implements OnInit, OnChanges {
  @Input() loadData: boolean = false;
  @Output() idCate = new EventEmitter<number>();
  categoryList: any;
  constructor(private cateHttp: CategoryService) { }

  ngOnInit(): void {
    this.getAllCategory();
  }

  ngOnChanges() {
    if (this.loadData == true) {
      this.getAllCategory();
    }
  }

  update(id: number) {
    this.idCate.emit(id)
  }
  getAllCategory() {
    this.cateHttp.getAllCategory().subscribe(res => {
      this.categoryList = res;
    });
  }

  deleteCategory(id: number) {
    this.cateHttp.deleteCategory(id).subscribe(() => {
      this.getAllCategory();
    });
  }
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
  listOfCurrentPageData: readonly Category[] = [];
  listOfData: readonly Category[] = [];
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

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach(item => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Category[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }
}
