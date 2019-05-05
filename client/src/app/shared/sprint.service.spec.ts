import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SprintService } from './sprint.service';

describe('SprintService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ 
        HttpClientTestingModule
      ],
      providers: [SprintService]
    });
  });

  it('should be created', inject([SprintService], (service: SprintService) => {
    expect(service).toBeTruthy();
  }));
});
