/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));

module CQRSjs.Test{

    describe("framework id generator", function(){

        it("always generates a unique ID", function(){
            var testDictionary = {};
            for(var i = 0; i < 100; i++){
                var generatedID = IDGenerator.generate();
                expect(testDictionary[generatedID]).toBeUndefined();
                testDictionary[generatedID] = true;                
            }
        });

        it("provides a sufficiently complex ID", function(){
            var generatedID = IDGenerator.generate();
            expect(generatedID.length).toBeGreaterThan(35);
        });

        it("does not provide a ridiculously complex ID", function(){
            var generatedID = IDGenerator.generate();
            expect(generatedID.length).toBeLessThan(37);
        });
    });

}