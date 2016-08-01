var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));
var CQRSjs;
(function (CQRSjs) {
    var Test;
    (function (Test) {
        describe("a value object", function () {
            var TestValueObject = (function (_super) {
                __extends(TestValueObject, _super);
                function TestValueObject(ID, TestProperty) {
                    _super.call(this);
                    this.ID = ID;
                    this.TestProperty = TestProperty;
                }
                return TestValueObject;
            }(CQRSjs.Domain.ValueObject));
            var testID = "123";
            var testArray = ["one", "two", "three"];
            var badArray = ["one", "two", "three", "four"];
            var testObj1 = new TestValueObject(testID, testArray);
            var testObj2 = new TestValueObject(testID, testArray);
            var testObj3 = new TestValueObject(testID, badArray);
            var testObj4 = new TestValueObject(CQRSjs.IDGenerator.generate(), testArray);
            var testObj5 = new TestValueObject(CQRSjs.IDGenerator.generate(), badArray);
            it("correctly compares two value objects with an array", function () {
                expect(testObj1.equals(testObj1)).toBeTruthy();
                expect(testObj1.equals(testObj2)).toBeTruthy();
                expect(testObj1.equals(testObj3)).toBeFalsy();
                expect(testObj1.equals(testObj4)).toBeFalsy();
                expect(testObj1.equals(testObj5)).toBeFalsy();
                expect(testObj3.equals(testObj4)).toBeFalsy();
                expect(testObj3.equals(testObj5)).toBeFalsy();
                expect(testObj4.equals(testObj5)).toBeFalsy();
            });
        });
        describe("a value object", function () {
            var InnerValueObject = (function (_super) {
                __extends(InnerValueObject, _super);
                function InnerValueObject(One, Two, Three) {
                    _super.call(this);
                    this.One = One;
                    this.Two = Two;
                    this.Three = Three;
                }
                return InnerValueObject;
            }(CQRSjs.Domain.ValueObject));
            var TestValueObject = (function (_super) {
                __extends(TestValueObject, _super);
                function TestValueObject(ID, TestProperty) {
                    _super.call(this);
                    this.ID = ID;
                    this.TestProperty = TestProperty;
                }
                return TestValueObject;
            }(CQRSjs.Domain.ValueObject));
            var testID = "123";
            var testObj = new InnerValueObject(1, 2, 3);
            var badObj = new InnerValueObject(1, 2, 4);
            var testObj1 = new TestValueObject(testID, testObj);
            var testObj2 = new TestValueObject(testID, testObj);
            var testObj3 = new TestValueObject(testID, badObj);
            var testObj4 = new TestValueObject(CQRSjs.IDGenerator.generate(), testObj);
            var testObj5 = new TestValueObject(CQRSjs.IDGenerator.generate(), badObj);
            it("correctly compares two value objects with an inner value object", function () {
                expect(testObj.equals(badObj)).toBeFalsy();
                expect(testObj1.equals(testObj1)).toBeTruthy();
                expect(testObj1.equals(testObj2)).toBeTruthy();
                expect(testObj1.equals(testObj3)).toBeFalsy();
                expect(testObj1.equals(testObj4)).toBeFalsy();
                expect(testObj1.equals(testObj5)).toBeFalsy();
                expect(testObj3.equals(testObj4)).toBeFalsy();
                expect(testObj3.equals(testObj5)).toBeFalsy();
                expect(testObj4.equals(testObj5)).toBeFalsy();
            });
        });
        describe("a value object", function () {
            var TestValueObject = (function (_super) {
                __extends(TestValueObject, _super);
                function TestValueObject(ID, TestProperty) {
                    _super.call(this);
                    this.ID = ID;
                    this.TestProperty = TestProperty;
                }
                return TestValueObject;
            }(CQRSjs.Domain.ValueObject));
            var testID = "123";
            var testObj = { "one": 1, "two": 2, "three": 3 };
            var badObj = { "one": 1, "two": 2, "three": 4 };
            var testObj1 = new TestValueObject(testID, testObj);
            var testObj2 = new TestValueObject(testID, testObj);
            var testObj3 = new TestValueObject(testID, badObj);
            var testObj4 = new TestValueObject(CQRSjs.IDGenerator.generate(), testObj);
            var testObj5 = new TestValueObject(CQRSjs.IDGenerator.generate(), badObj);
            it("correctly compares two value objects with an object", function () {
                expect(testObj1.equals(testObj1)).toBeTruthy();
                expect(testObj1.equals(testObj2)).toBeTruthy();
                expect(testObj1.equals(testObj3)).toBeFalsy();
                expect(testObj1.equals(testObj4)).toBeFalsy();
                expect(testObj1.equals(testObj5)).toBeFalsy();
                expect(testObj3.equals(testObj4)).toBeFalsy();
                expect(testObj3.equals(testObj5)).toBeFalsy();
                expect(testObj4.equals(testObj5)).toBeFalsy();
            });
        });
        describe("a value object", function () {
            var TestValueObject = (function (_super) {
                __extends(TestValueObject, _super);
                function TestValueObject(ID, TestProperty) {
                    _super.call(this);
                    this.ID = ID;
                    this.TestProperty = TestProperty;
                }
                return TestValueObject;
            }(CQRSjs.Domain.ValueObject));
            var testID = "123";
            var testObj = { "one": 1, "two": { "one": 1, "two": { "one": 1, "two": 2 } } };
            var badObj = { "one": 1, "two": { "one": 1, "two": { "one": 1, "two": 3 } } };
            var testObj1 = new TestValueObject(testID, testObj);
            var testObj2 = new TestValueObject(testID, testObj);
            var testObj3 = new TestValueObject(testID, badObj);
            it("correctly compares two value objects with a 3 level stack", function () {
                expect(testObj1.equals(testObj2)).toBeTruthy();
                expect(testObj1.equals(testObj3)).toBeFalsy();
            });
        });
        describe("a value object", function () {
            var TestValueObject = (function (_super) {
                __extends(TestValueObject, _super);
                function TestValueObject(ID, TestProperty) {
                    _super.call(this);
                    this.ID = ID;
                    this.TestProperty = TestProperty;
                }
                return TestValueObject;
            }(CQRSjs.Domain.ValueObject));
            var testID = "123";
            var testObj = { "one": 1, "two": { "one": 1, "two": { "one": 1, "two": { "one": 1, "two": 2 } } } };
            var testObj1 = new TestValueObject(testID, testObj);
            var testObj2 = new TestValueObject(testID, testObj);
            var errorMessage;
            CQRSjs.Framework.ErrorService.Instance.clearOnThrowEvents();
            CQRSjs.Framework.ErrorService.Instance.onThrow(function (message) { errorMessage = message; });
            it("it fails when the stack is too deep", function () {
                expect(testObj1.equals(testObj2)).toBeFalsy();
                expect(errorMessage).toBe("stack overflow in value object comparison. avoid circular references in value objects");
            });
        });
    })(Test = CQRSjs.Test || (CQRSjs.Test = {}));
})(CQRSjs || (CQRSjs = {}));
