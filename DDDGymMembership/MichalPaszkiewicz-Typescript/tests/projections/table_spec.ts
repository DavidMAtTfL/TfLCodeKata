/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));

module CQRSjs.Test{

    describe("a table", function(){

        var table = new Projections.Table("testTable");

        it("should have no entries to start with", function(){
            expect(table.Rows.length).toBe(0);
            expect(table.getData().length).toBe(0);
        });      

    });

    describe("a table", function(){

        var table = new Projections.Table("testTable");
        var row = new Projections.Row({"one":1,"two":2});      

        table.Rows = [row];

        it("should retrieve entries correctly", function(){
            expect(table.Rows.length).toBe(1);
            expect(table.getData().length).toBe(1);
            expect(table.getData()[0].one).toBe(1);
            expect(table.getData()[0].two).toBe(2);
        });      

    });

}