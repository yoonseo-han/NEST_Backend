import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import {User} from './user.entity'

//To use following jwt strategy anywhere via its dependency injection system
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    //class extends the PassportStrategy class defined by passport-jwt package
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ) {
        //2 important components(options)
        super({
            //If token is appropriate : For checking
            secretOrKey: 'ClassumBackend',
            //Following configures the strategy to look for the token : in the form of bearer token
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    //Pass payload if token is valid
    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepo.findOne({username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
