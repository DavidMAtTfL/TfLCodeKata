/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("projections"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        describe("a table row", function () {
            var data = { "one": 1, "two": 2, "three": [1, 2, 3] };
            var row = new CQRSjs.Projections.Row(data);
            it("should convert data to JSON correctly", function () {
                expect(row.Data).toBe(JSON.stringify(data));
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
