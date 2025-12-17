import { TestBed } from '@angular/core/testing';

import {  studentService } from './student';

describe('studentService', () => {
  let service: studentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(studentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
