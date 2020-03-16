import { TestBed } from '@angular/core/testing';

import { PersonaServiceService } from './persona-service.service';

describe('PersonaServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PersonaServiceService = TestBed.get(PersonaServiceService);
    expect(service).toBeTruthy();
  });
});
