module CQRSjs.Framework{

    export class AddressSetEvent extends Event{

        private _street: string;
        private _province: string;
        private _city: string;

        get Street(){
            return this._street;
        }

        get Province(){
            return this._province;
        }

        get City(){
            return this._city;
        }

        constructor(customerID: string, userName: string, city: string, province: string, street: string){
            super(customerID, "AddressSet", userName);

            this._street = street;
            this._province = province;
            this._city = city;
        }

    }

}