/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));

module CQRSjs.test{

        describe("an aggregate root", function(){

        it("should be equal to another aggregate root if they have the same id value", function(){
            var id = IDGenerator.generate();

            var baseEntity1 = new Domain.EntityBase(id);
            var baseEntity2 = new Domain.EntityBase(id);

            expect(baseEntity1.equals(baseEntity2)).toBeTruthy();
        });

        it("should not be equal to another aggregat root if they have different ids", function(){

            var baseEntity1 = new Domain.EntityBase(IDGenerator.generate());
            var baseEntity2 = new Domain.EntityBase(IDGenerator.generate());

            expect(baseEntity1.equals(baseEntity2)).toBeFalsy();

        });

        it("should not be equal to another aggregate root if they both have null ids", function(){

            var baseEntity1 = new Domain.EntityBase(null);
            var baseEntity2 = new Domain.EntityBase(null);

            expect(baseEntity1.equals(baseEntity2)).toBeFalsy();

        });

    })
}