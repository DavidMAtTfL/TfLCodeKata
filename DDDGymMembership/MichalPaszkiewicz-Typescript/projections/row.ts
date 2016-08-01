namespace CQRSjs.Projections{
    
    export class Row{
        Data: string;
        
        constructor(data: Object){
            this.Data = JSON.stringify(data);
        }
    }
    
}