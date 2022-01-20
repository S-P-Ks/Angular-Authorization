import { TestBed } from '@angular/core/testing';

import { TokenInterceptorGuard } from './token-interceptor.guard';

describe('TokenInterceptorGuard', () => {
  let guard: TokenInterceptorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TokenInterceptorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
