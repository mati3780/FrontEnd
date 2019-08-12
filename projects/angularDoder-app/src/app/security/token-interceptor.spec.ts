import { TokenInterceptor } from './token-interceptor';
import { AuthorizationService } from './authorization.service';

describe('TokenInterceptor', () => {
  it('should create an instance', () => {
    expect(new TokenInterceptor(new AuthorizationService())).toBeTruthy();
  });
});
