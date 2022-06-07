import { Body, Controller, Injectable, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { GetUser } from './get-user.decorator';
import {User} from './user.entity';

@Controller('auth')
export class AuthController {
    //constructor to initialize
    constructor(private authService: AuthService) { }

    @Post('/signin')
    //Receive user information from bodu and send to service
    signIn(@Body(ValidationPipe) authCredentialsDTO: AuthCredentialsDto) : Promise<void> {
        return this.authService.signIn(authCredentialsDTO);
    }

    @Post('/login')
    logIn(@Body(ValidationPipe) authCredDTO: AuthCredentialsDto) : Promise<{accessToken: string}> {
        return this.authService.logIn(authCredDTO);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user: User) { 
        console.log('user',user);
    }
}
