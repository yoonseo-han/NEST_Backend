import { ArgumentMetadata, BadRequestException, PipeTransform } from "@nestjs/common";
import { SpaceStatus } from "../space.model";

//Custom pipe defined to validate input status 
export class SpaceStatusValidationPipe implements PipeTransform {
    //Define data members of status options
    readonly StatusOptions = [
        SpaceStatus.PRIVATE,
        SpaceStatus.PUBLIC
    ]

    transform(value: any) {
        //Change value to all upper case
        value = value.toUpperCase();

        //Exception handling
        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} is not an appropriate status`);
        }

        //IF valid, return value
        return value;
    }

    private isStatusValid(value: any) {
        const index = this.StatusOptions.indexOf(value);
        return index !== -1;
    }
}