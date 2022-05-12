import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    //COnditions for username and password
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    //Combination of only english and number
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'Password only accepts english and number'
    })
    password: string;
}