import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../model/product';
import { ProductService } from '../../service/product-service.service';



@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styles: [
  ]
})

export class ProductTableComponent implements OnInit {
  @Input() textSearch: any;
  productList: any = [];
  switchValue = false;
  constructor(private proHttp: ProductService) { }

  ngOnInit(): void {
    this.getAllProduct();
  }

  availableChange(event: any, id: number) {
    var product: any;
    this.productList.forEach((c: any) => {
      if (c.id == id) {
        product = c;
      }
    })
    if (event == true) {
      const data = { ...product, available: 1 }
      this.proHttp.updateProduct(data).subscribe()
    } else {
      const data = { ...product, available: 0 }
      this.proHttp.updateProduct(data).subscribe()
    }


  }

  getAllProduct() {
    this.proHttp.getAllProduct1().subscribe(res => {
      this.productList = res;
      console.log(res);
    });
  }


  deleteProduct(id: number) {
    this.proHttp.deleteProduct(id).subscribe(() => {
      this.getAllProduct();
    })
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
  listOfCurrentPageData: readonly Product[] = [];
  listOfData: readonly Product[] = [];
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

  onCurrentPageDataChange($event: readonly Product[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every(item => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some(item => this.setOfCheckedId.has(item.id)) && !this.checked;
  }



}
