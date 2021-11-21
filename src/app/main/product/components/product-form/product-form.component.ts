import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Observable, Subscriber } from 'rxjs';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../service/category.service';
import { ProductService } from '../../service/product-service.service';
import { Product } from '../../model/product';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styles: [
    `.mess-err{
      color: red;
    }`
  ]
})
export class ProductFormComponent implements OnInit {
  product: any;
  image = "../../../../../assets/tmp/img/imgdefault.jpg";
  categoryList: any = [];
  productForm: FormGroup;
  labelButton: string = '';
  constructor(private fb: FormBuilder,
    private cateHttp: CategoryService,
    private proHttp: ProductService,
    private message: NzMessageService,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAllCategory();
    this.createForm();
    this.labelButtonByRoute();
  }



  resetFormUpdate() {
    this.productForm.patchValue({
      name: this.product.name,
      price: this.product.price,
      description: this.product.description,
      quantity: this.product.quantity,
      category: this.product.category.id.toString()
    })
    this.image = this.product.image;
  }

  labelButtonByRoute() {
    this.activatedRoute.params.subscribe(params => {
      if (params.id == undefined) {
        this.labelButton = 'Thêm';
      } else {
        this.labelButton = 'Cập nhật ';
        this.paramsRouter();
      }
    });
  }

  paramsRouter() {
    this.activatedRoute.params.subscribe(params => {
      this.getProductById(params.id)
    });
  }

  getProductById(id: number) {
    this.proHttp.getProductById(id).subscribe(res => {
      this.product = res;
      this.resetFormUpdate();
    });
  }

  getAllCategory() {
    this.cateHttp.getAllCategory().subscribe(res => {
      this.categoryList = res;
    });
  }

  fileChange(event: any) {
    this.convertToBase64(event.target.files[0])
  }

  convertToBase64(file: File) {
    const observable = new Observable((subscriber: Subscriber<any>) => {
      this.readFile(file, subscriber);
    });
    observable.subscribe(
      (d) => {
        this.image = d;
      }
    );
  }

  createForm() {
    this.productForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(50)]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
  }

  validForm = {
    name: [
      {
        type: 'required',
        message: 'Không được để trống'
      },
      {
        type: 'maxlength',
        message: 'Không được quá 50 ký tự'
      }
    ],
    quantity: [
      {
        type: 'required',
        message: 'Không được để trống'
      }
    ],
    category: [
      {
        type: 'required',
        message: 'Không được để trống'
      }
    ],
    price: [
      {
        type: 'required',
        message: 'Không được để trống'
      }
    ],
    description: [
      {
        type: 'required',
        message: 'Không được để trống'
      }
    ]
  };

  submit() {
    this.labelButton == 'Thêm' ? this.addProduct() : this.updateProduct();
  }

  resetForm() {
    this.productForm.reset();
  }
  updateProduct() {
    const name = this.productForm.value.name.trim();
    var category = '';
    this.categoryList.forEach((c: any) => {
      if (c.id == this.productForm.value.category) {
        category = c;
      }
    })
    const data = { ...this.productForm.value, image: this.image, name: name, id: this.product.id, createDate: this.product.createDate, available: this.product.available, category: category }
    this.proHttp.updateProduct(data).subscribe(() => {
      this.message.create('success', 'Cập nhật thành công');
    });
  }

  addProduct() {
    const name = this.productForm.value.name.trim();
    var category = '';
    this.categoryList.forEach((c: any) => {
      if (c.id == this.productForm.value.category) {
        category = c;
      }
    })
    const data = { ...this.productForm.value, image: this.image, name: name, id: '', createDate: new Date(), available: 1, category: category }
    this.proHttp.addProduct(data).subscribe(() => {
      this.message.create('success', 'Thêm thành công');
      this.productForm.reset();
    });
  }
  readFile(file: File, subscriber: Subscriber<any>) {
    const filereader = new FileReader();
    filereader.readAsDataURL(file);
    filereader.onload = () => {
      subscriber.next(filereader.result);
      subscriber.complete();
    };

    filereader.onerror = (error) => {
      subscriber.error(error);
      subscriber.complete();
    }
  }
}
