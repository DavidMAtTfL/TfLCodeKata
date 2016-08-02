module CQRSjs.Domain{

    export class Transaction extends EntityBase{

        Amount: number;

        constructor(id: string, amount: number){
            super(id);

            this.Amount = amount;
        }

    }

}