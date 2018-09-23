import { TestBed } from '@angular/core/testing';

import { TradersService } from './traders.service';

describe('TradersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TradersService = TestBed.get(TradersService);
    expect(service).toBeTruthy();
  });
});
