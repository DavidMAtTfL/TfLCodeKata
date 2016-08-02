namespace CQRSjs.Domain{

    export class EntityBase{
        ID: string;

        constructor(id: string){
            this.ID = id;
        }

        equals(other: EntityBase){
            if(!this.ID || !other.ID){
                return false;
            }

            return this.ID == other.ID;
        }
    }

}