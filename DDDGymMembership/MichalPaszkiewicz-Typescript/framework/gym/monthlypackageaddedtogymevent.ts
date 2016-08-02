module CQRSjs.Framework{

    export class MonthlyPackageAddedToGymEvent extends Event{

        private _packageID: string;
        private _name: string;
        private _price: number;

        get PackageID(): string{
            return this._packageID;
        }

        get Name(){
            return this._name;
        }

        get Price(){
            return this._price;
        }

        constructor(gymID: string, userName: string, packageID: string, name: string, price: number){
            super(gymID, "MonthlyPackageAddedToGym", userName);

            this._packageID = packageID;
            this._name = name;
            this._price = price;
        }

    }

}