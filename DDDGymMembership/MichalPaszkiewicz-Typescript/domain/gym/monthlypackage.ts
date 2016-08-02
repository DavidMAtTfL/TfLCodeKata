module CQRSjs.Domain{

    export class MonthlyPackage extends EntityBase{

        Name: string;
        Price: number;

        constructor(id: string, name: string, price: number){
            super(id);

            this.Name = name;
            this.Price = price;
        }

    }

}