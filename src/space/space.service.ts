import { Injectable } from '@nestjs/common';

@Injectable()
export class SpaceService {
    private space = []; //Local database
    
    getAllSpace() {
        return this.space; //Retun all info stored in space
    }
}
