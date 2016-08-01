module CQRSjs.Domain{

    export class Address extends ValueObject{
        private _city: string;
        private _province: string;
        private _street: string;

        get City(){ return this._city; }
        get Province(){ return this._province; }
        get Street(){ return this._street; }

        constructor(city: string, province: string, street: string){
            super();

            this._city = Helpers.ensureStringHasValue(city, "city");
            this._province = Helpers.ensureStringHasValue(province, "province");
            this._street = Helpers.ensureStringHasValue(street, "street");
        }

    }

}