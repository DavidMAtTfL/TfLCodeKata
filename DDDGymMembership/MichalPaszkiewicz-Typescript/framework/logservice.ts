namespace CQRSjs.Framework{

    export class LogService{
        private static _instance: LogService; 

        onLog(onLogEvent: (message: string) => void): void{
            this._onLogEvents.push(onLogEvent);
        }

        static get Instance(){
            if(LogService._instance == null){
                LogService._instance = new LogService();
                LogService._instance.onLog(function(message: string){
                    console.log(message);
                });
            }
            return LogService._instance;
        }

        private _onLogEvents: ((message: string) => void)[] = [];

        log(message: string): void{
            this._onLogEvents.forEach((onLogEvent)=>{
                onLogEvent(message);
            });
        }

        clearLogEvents(): void{
            this._onLogEvents = [];
        }
    }
}