//dto : USed to deal with the data transfer in a more efficient manner
//When change one structure of data, it makes change to all codes: inefficient
//DTO used to handle

//USe class validator pipeline to ensure that variable is not empty
import {IsNotEmpty} from "class-validator";

export class CreateSpaceDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description : string;
}