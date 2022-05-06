import { Controller, Get } from '@nestjs/common';
import { SpaceService } from './space.service';

//Route: space
@Controller('space')
export class SpaceController {
    //constructor used to define space service as property of class -> parameter must be defined in private to be able to use in class
    constructor(private spaceService : SpaceService) {}

    //Able to use member function in space service

    @Get('/')
    getAllSpace() {
        //Handler to receive all space from space service
        //Handler handles the request and sends to controller
        return this.spaceService.getAllSpace();
    }

}
