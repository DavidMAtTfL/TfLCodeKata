/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
var CQRSjs;
(function (CQRSjs) {
    var test;
    (function (test) {
        describe("an aggregate root", function () {
            it("should be equal to another aggregate root if they have the same id value", function () {
                var id = CQRSjs.IDGenerator.generate();
                var baseEntity1 = new CQRSjs.Domain.EntityBase(id);
                var baseEntity2 = new CQRSjs.Domain.EntityBase(id);
                expect(baseEntity1.equals(baseEntity2)).toBeTruthy();
            });
            it("should not be equal to another aggregat root if they have different ids", function () {
                var baseEntity1 = new CQRSjs.Domain.EntityBase(CQRSjs.IDGenerator.generate());
                var baseEntity2 = new CQRSjs.Domain.EntityBase(CQRSjs.IDGenerator.generate());
                expect(baseEntity1.equals(baseEntity2)).toBeFalsy();
            });
            it("should not be equal to another aggregate root if they both have null ids", function () {
                var baseEntity1 = new CQRSjs.Domain.EntityBase(null);
                var baseEntity2 = new CQRSjs.Domain.EntityBase(null);
                expect(baseEntity1.equals(baseEntity2)).toBeFalsy();
            });
        });
    })(test = CQRSjs.test || (CQRSjs.test = {}));
})(CQRSjs || (CQRSjs = {}));
