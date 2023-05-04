import { TestBed } from '@angular/core/testing';

import { DeldialogService } from './deldialog.service';

describe('DeldialogService', () => {
  let service: DeldialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeldialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
