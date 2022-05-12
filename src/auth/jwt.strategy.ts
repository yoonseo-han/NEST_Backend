import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./user.repository";
import {User} from './user.entity'

//To use following jwt strategy anywhere
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UserRepository)
        private userRepo: UserRepository
    ) {
        //2 important components
        super({
            //If token is appropriate
            secretOrKey: 'ClassumBackend',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }
    //PAss payload if token is valid
    async validate(payload) {
        const {username} = payload;
        const user: User = await this.userRepo.findOne({username});

        if(!user) {
            throw new UnauthorizedException();
        }

        return user;
    }
}
