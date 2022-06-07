import { Body, Controller, Delete, Get, Logger, Param, ParseIntPipe, Patch, Post, Put, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceStatus } from './space-status.enum';
import { CreateSpaceDTO } from './dto/create-space.dto';
import { SpaceStatusValidationPipe } from './pipes/space-status-validation.pipe';
import {Space} from './space.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

//Route: space
@Controller('space')
@UseGuards(AuthGuard())
export class SpaceController {
    //SpaceContoller in parameter: Acts as a tag for log
    private logger = new Logger('SpaceController');
    //constructor used to define space service as property of class -> parameter must be defined in private to be able to use in class
    constructor(private spaceService : SpaceService) {}

    //Able to use member function in space service

    @Get('/')
    getAllSpace(
        @GetUser() user : User
    ): Promise<Space[]> {
        //Log to record what user is calling following function
        this.logger.verbose(`User ${user.username} trying to get all space`);
        //Handler to receive all space from space service
        //Handler handles the request and sends to controller
        return this.spaceService.getAllSpace(user);
    }

    @Post('/')
    //Add handler level pipe: validation pipe for validation
    @UsePipes(ValidationPipe)
    //Use @Body to receive input from client
    //Return a space entity created
    createSpace(@Body() createSpaceDTO: CreateSpaceDTO , 
    @GetUser() user: User): Promise<Space> {
        //Log the payload info
        this.logger.verbose(`User ${user.username} creating a new space.
        Payload: ${JSON.stringify(createSpaceDTO)}`);
        return this.spaceService.createSpace(createSpaceDTO, user);
    }

    //Return specific space with id
    @Get('/:id')
    getSpaceById(@Param('id') id: number) : Promise<Space> {
        return this.spaceService.getSpaceByID(id);
    }

    // //Delete specific space with id
    // @Delete('/:id')
    // deleteSpaceById(@Param('id') id: string): void {
    //     this.spaceService.deleteSpaceByID(id);
    // }

    //Delete specific space with id
    //ParseIntPipe: Ensure that input is in integer datatype
    @Delete('/:id')
    deleteSpace(@Param('id', ParseIntPipe) id: number,
    @GetUser() user: User) : Promise<void> {
        return this.spaceService.deleteSpaceByID(id, user);
    }

    //Update status of space with xspecific id
    //custome pipe to check validation of space status
    @Patch('/:id/status')
    updateSpaceStatus(
        @Param('id', ParseIntPipe) id : number, 
        @Body('status', SpaceStatusValidationPipe) status : SpaceStatus
    ) {
        return this.spaceService.updateSpaceStatus(id, status);
    }
}
