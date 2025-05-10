import { RolesGuard } from '../src'
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should allow access if no roles are required', () => {
    const mockCtx = createMockContext();
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);

    expect(guard.canActivate(mockCtx)).toBe(true);
  });

  it('should allow access if user has required role', () => {
    const mockCtx = createMockContext({ role: 'Admin' });
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['Admin', 'Viewer']);

    expect(guard.canActivate(mockCtx)).toBe(true);
  });

  it('should deny access if user does not have required role', () => {
    const mockCtx = createMockContext({ role: 'Viewer' });
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(['Owner']);

    expect(guard.canActivate(mockCtx)).toBe(false);
  });
});

// Utility to create mock ExecutionContext and GqlExecutionContext
function createMockContext(user = { role: 'Viewer' }): ExecutionContext {
  const gqlContext = { user };

  const executionContext: Partial<ExecutionContext> = {
    getClass: jest.fn(),
    getHandler: jest.fn(),
  };

  // Mock GqlExecutionContext.create().getContext()
  jest.spyOn(GqlExecutionContext, 'create').mockReturnValueOnce({
    getContext: () => gqlContext,
  } as any);

  return executionContext as ExecutionContext;
}
