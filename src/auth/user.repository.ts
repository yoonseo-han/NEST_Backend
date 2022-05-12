import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { User } from "./user.entity";
import * as bycrypt from 'bcryptjs'

@EntityRepository(User)
export class UserRepository extends Repository <User>{
    //Create user and save in db
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const {username, password} = authCredentialsDto;
        //Encrypt password
        //salt : Eventhough original pw is same, based on salt, generate different encrpted ver
        const salt = await bycrypt.genSalt();
        //Hashed pw generated based on salt+original password
        const hashedPW = await bycrypt.hash(password, salt);

        //Create new instance/entity
        const user = this.create({username: username, password: hashedPW});

        //Validation of username
        try {
            await this.save(user);
        } catch(error) {
            if(error.code === 'ER_DUP_ENTRY') {
                throw new ConflictException(`Existing username`);
            } else {
                throw new InternalServerErrorException();
            }
        }

    }
}