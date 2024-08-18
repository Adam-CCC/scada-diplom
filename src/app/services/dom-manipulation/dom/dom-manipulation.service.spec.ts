import { TestBed } from '@angular/core/testing';

import { DomManipulation } from './dom-manipulation.service';

describe('DomManipulation', () => {
  let service: DomManipulation;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DomManipulation);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
