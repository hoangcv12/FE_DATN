import { NzMessageService } from 'ng-zorro-antd/message';
import { AuthService } from './../service/auth.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { MatchControl } from '@delon/util/form';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRegisterComponent implements OnDestroy {
  constructor(fb: FormBuilder, private router: Router, private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private authService: AuthService) {
    this.form = fb.group(
      {
        mail: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.checkPassword.bind(this)]],
        confirm: [null, [Validators.required, Validators.minLength(6)]],
        captcha: [null, [Validators.required]],
        fullname: [null, [Validators.required]],
        username: [null, [Validators.required]]
      },
      {
        validators: MatchControl('password', 'confirm')
      }
    );
  }

  code: any;
  // #region fields

  get mail(): AbstractControl {
    return this.form.controls.mail;
  }
  get password(): AbstractControl {
    return this.form.controls.password;
  }
  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }
  get mobile(): AbstractControl {
    return this.form.controls.mobile;
  }
  get captcha(): AbstractControl {
    return this.form.controls.captcha;
  }
  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  visible = false;
  status = 'pool';
  progress = 0;
  passwordProgressMap: { [key: string]: 'success' | 'normal' | 'exception' } = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception'
  };

  // #endregion

  // #region get captcha

  count = 0;
  interval$: any;

  static checkPassword(control: FormControl): NzSafeAny {
    if (!control) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }

  getCaptcha(): void {
    this.authService.getCode(this.form.value.mail).subscribe((res: any) => {
      this.code = res.results;
      this.message.create('success', 'Mã xác nhận đã được gửi tới email');
    })
  }

  // #endregion

  submit(): void {
    console.log(this.code);

    if (this.form.value.captcha !== this.code) {
      this.message.create('error', 'Mã xác nhận không đúng');
    } else {
      const data = { email: this.form.value.mail, username: this.form.value.username, password: this.form.value.password, fullname: this.form.value.fullname }
      this.authService.createAccount(data).subscribe(() => {
        this.router.navigateByUrl('passport/login')
        this.message.create('success', 'Đăng ký thành công');
      })
    }

  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
