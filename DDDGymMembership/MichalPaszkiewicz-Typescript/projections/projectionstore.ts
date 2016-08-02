namespace CQRSjs.Projections{
    
    export class ProjectionStore{
        
        private static _instance: ProjectionStore;
        
        static get Instance(){
            if(ProjectionStore._instance == null){
                ProjectionStore._instance = new ProjectionStore();
            }
            return ProjectionStore._instance;            
        }
        
        private _tables: Table[] = [];
        private _getTables: () => Table[] = () => {
            return this._tables;
        }

        get Tables(): Table[]{
            return this._getTables();
        }

        overrideGetTables(func: () => Table[]){
            this._getTables = func;
        }

        private _clear: () => void = () => {
            this._tables.forEach((t: Table)=>{
                t.clear();
            });
            this._tables = [];
        }

        clear(){
            this._clear();
        }

        overrideClear(clearFunc: () => void){
            this._clear = clearFunc;
        }
        
        private _addTable: (name: string) => void = (name) => {
            this._tables.push(new Projections.Table(name));
        }

        addTable(name: string){
            this._addTable(name);
        }

        overrideAddTable(func: (name: string) => void){
            this._addTable = func;
        }
        
        private _addRowToTable: (tableName: string, row: Row) => void = (tableName: string, row: Row) => 
        {
            var table = this.getTable(tableName);
            table.Rows.push(row);
        }

        addRowToTable(tableName: string, row: Row){
            this._addRowToTable(tableName, row);
        }

        overrideAddRowToTable(func: (tableName: string, row: Row) => void){
            this._addRowToTable = func;
        }

        private _addRowsToTable: (tableName: string, rows: Row[]) => void = (tableName: string, rows: Row[]) => 
        {
            var table = this.getTable(tableName);
            table.Rows = table.Rows.concat(rows);
        }
        
        addRowsToTable(tableName: string, rows: Row[]){
            this._addRowsToTable(tableName, rows);
        }

        overrideAddRowsToTable(func: (tableName: string, rows: Row[]) => void){
            this._addRowsToTable = func;
        }

        private _getTable: (name: string) => Table = (name) => {
            var tables = this.Tables;
            for(var i = 0; i < tables.length; i++){
                if(tables[i].Name == name){
                    return tables[i];
                }
            }
            Framework.ErrorService.throw(`Table {name} not found`)
        }
        
        getTable(name: string): Table{
            return this._getTable(name);
        }
        
        overrideGetTable(func: (name: string) => Table){
            this._getTable = func;
        }
    }
    
}