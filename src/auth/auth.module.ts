import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JWTStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';

@Module({
  imports: [
    PassportModule.register({defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'ClassumBackend',
      signOptions: {
        expiresIn: 60*60*24*30,
      }
    }),
    TypeOrmModule.forFeature([UserRepository])
  ],
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  exports: [JWTStrategy, PassportModule]
})
export class AuthModule {}
