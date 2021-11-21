import { NzMessageService } from 'ng-zorro-antd/message';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../service/category.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styles: [
  ]
})
export class CategoryComponent implements OnInit {
  table: boolean = false;
  nameCategory = '';
  isVisible = false;
  constructor(private cateHttp: CategoryService, private message: NzMessageService) { }

  ngOnInit(): void {
  }

  addCategory(data: any) {
    this.cateHttp.addCategory(data).subscribe(() => {
      this.message.create('success', 'Thêm thành công');
      this.table = true;
    })
  }

  addIdCate(event: any) {

  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!', this.nameCategory);
    const data = { id: '', name: this.nameCategory }
    this.addCategory(data);
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
