import { TestBed } from '@angular/core/testing';
import { Tokenservice } from './tokenservice';

describe('Tokenservice', () => {
  let service: Tokenservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Tokenservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
