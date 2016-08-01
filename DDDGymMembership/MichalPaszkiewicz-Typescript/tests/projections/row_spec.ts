/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));

module CQRSjs.Test{

    describe("a table row", function(){

        var data = {"one":1,"two":2,"three":[1,2,3]};

        var row = new Projections.Row(data);

        it("should convert data to JSON correctly", function(){
            expect(row.Data).toBe(JSON.stringify(data));
        });

    });

}