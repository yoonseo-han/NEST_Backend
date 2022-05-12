import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bycrypt from 'bcryptjs';
import { UnsubscriptionError } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    //Initialize using constructor
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }


    //Sign in function
    async signIn(authCredentialsDTO: AuthCredentialsDto) : Promise<void>{
        return this.userRepository.createUser(authCredentialsDTO);
    }

    //Login function
    async logIn(authCredDTO: AuthCredentialsDto) : Promise<{accessToken: string}> {
        const {username, password} = authCredDTO;
        const user = await this.userRepository.findOne({username});

        if(user && (await bycrypt.compare(password, user.password))) {
            //When success in login, generate jwt token based on secret+payload
            const payload = {username: username} //payload generated based on username
            const accessToken = await this.jwtService.sign(payload);

            return {accessToken: accessToken};
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
