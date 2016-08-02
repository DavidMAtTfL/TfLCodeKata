namespace CQRSjs.Framework{

    export class ErrorService{
        private static _instance: ErrorService;

        private _onThrowEvents: ((message: string) => void)[] = [];

        onThrow(onThrowEvent: (message: string) => void){
            this._onThrowEvents.push(onThrowEvent);
        }

        clearOnThrowEvents(){
            this._onThrowEvents = [];
        }

        static get Instance(){
            if(!this._instance){
                this._instance = new ErrorService();
                this._instance.onThrow((message: string) => { throw new Error(message); })
            }
            return this._instance;
        }

        static throw(message: string){
            ErrorService.Instance.throw(message);
        }

        throw(message: string){
            this._onThrowEvents.forEach((onThrowEvent)=>{
                onThrowEvent(message);
            });
        }
        
    }

}