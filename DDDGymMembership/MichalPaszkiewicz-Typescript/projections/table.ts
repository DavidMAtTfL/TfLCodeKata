namespace CQRSjs.Projections{
    
    export class Table{
        
        Name: string;
        Rows: Row[] = [];
        
        getData(){
            return this.Rows.map((row: Row)=>{
                return JSON.parse(row.Data);
            });
        }
        
        clear(){
            this.Rows = [];
        }
        
        constructor(tableName: string){
            this.Name = tableName;
                        
        }
    }    
    
}