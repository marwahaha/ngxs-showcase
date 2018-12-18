import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BannerComponent} from './banner.component';
import {MaterialModule} from '@shared';
import {NgxsModule} from '@ngxs/store';
import {AppState} from '../store/states/app.state';

describe('BannerComponent', () => {
  let component: BannerComponent;
  let fixture: ComponentFixture<BannerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BannerComponent],
      imports: [
        NgxsModule.forRoot([AppState]),
        MaterialModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
