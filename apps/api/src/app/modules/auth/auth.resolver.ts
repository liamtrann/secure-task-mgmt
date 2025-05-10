import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';
import { LoginResponse } from './dto/login-response.dto';
import { LoginInput } from './dto/login.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoginResponse)
  async login(
    @Args('loginInput') loginInput: LoginInput
  ): Promise<LoginResponse> {
    // Validate the user credentials
    const user = await this.authService.validateUser(
      loginInput.email,
      loginInput.password
    );

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Return the login response with token and user
    return this.authService.login(user);
  }
}
