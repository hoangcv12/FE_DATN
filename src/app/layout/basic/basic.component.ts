import { Component, OnInit } from '@angular/core';
import { Router, RoutesRecognized } from '@angular/router';
import { SettingsService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';
import { filter, pairwise } from 'rxjs/operators';
import { CartService } from 'src/app/main/website/service/cart.service';

@Component({
  selector: 'layout-basic',
  template: `
    <layout-default [options]="options" [asideUser]="asideUserTpl" [content]="contentTpl">
      
     
      <layout-default-header-item direction="left" hidden="pc">
        <div layout-default-header-item-trigger (click)="searchToggleStatus = !searchToggleStatus">
          <i nz-icon nzType="search"></i>
        </div>
      </layout-default-header-item>
      <layout-default-header-item direction="middle">
        <header-search class="alain-default__search" [toggleChange]="searchToggleStatus"></header-search>
      </layout-default-header-item>
      <layout-default-header-item direction="right" hidden="mobile">
        <div routerLink="/polygift/home"
                        routerLinkActive="active" layout-default-header-item-trigger nz-dropdown  nzTrigger="click" nzPlacement="bottomRight">
          <i nz-icon nzType="home"></i>
        </div>
      </layout-default-header-item>
      <layout-default-header-item direction="right">
        <header-user></header-user>
      </layout-default-header-item>
      <ng-template #asideUserTpl>
      
        <nz-dropdown-menu #userMenu="nzDropdownMenu">
          <ul nz-menu>
            <li nz-menu-item routerLink="/pro/account/center">Account Center</li>
            <li nz-menu-item routerLink="/pro/account/settings">Account Settings</li>
          </ul>
        </nz-dropdown-menu>
      </ng-template>
      <ng-template #contentTpl>
        <router-outlet></router-outlet>
      </ng-template>
    </layout-default>

    <!-- <setting-drawer *ngIf="showSettingDrawer"></setting-drawer>
    <theme-btn></theme-btn> -->
  `,
})
export class LayoutBasicComponent implements OnInit {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`,
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  get user(): User {
    return this.settings.user;
  }

  constructor(private settings: SettingsService, private router: Router, private cartService: CartService) {

    this.cartService.getAllByUserName().subscribe(res => {
      if (res.errorCode == 500 && res.message == null) {
        this.router.navigateByUrl('passport/login')
      }
    });
  }
  userName: any;
  ngOnInit(): void {
    this.userName = localStorage.getItem('username');
  }
}
