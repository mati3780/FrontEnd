import { TestBed } from '@angular/core/testing';

import { ResourceBaseService } from './resource-base.service';

describe('ResourceBaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResourceBaseService<TestModel> = TestBed.get(TestServiceImpl);
    expect(service).toBeTruthy();
  });
});

class TestServiceImpl extends ResourceBaseService<TestModel>{
  protected apiPath(): string {
    return "api/test";
  }

}

class TestModel {
}