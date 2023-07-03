import { TestBed } from '@angular/core/testing';

import { MessagePriveService } from './message-prive.service';

describe('MessagePriveService', () => {
  let service: MessagePriveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MessagePriveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
