import { Body, Controller, Injectable, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credential.dto';

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
    test(@Req() req) { 
        console.log('req',req);
    }
}
