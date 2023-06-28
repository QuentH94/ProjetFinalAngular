import { TestBed } from '@angular/core/testing';

import { MessageGlobalService } from './message-global.service';

describe('MessageGlobalService', () => {
  let service: MessageGlobalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessageGlobalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
