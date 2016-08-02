module CQRSjs.Helpers{

    export function ensureStringHasValue(text: string, propertyName: string): string{
        if(!text){
            Framework.ErrorService.throw(`property ${propertyName} must have a value`);
        }
        return text;
    }

}