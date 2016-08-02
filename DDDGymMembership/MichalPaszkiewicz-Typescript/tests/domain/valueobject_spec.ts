/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));
eval(loadModule("domain"));

module CQRSjs.Test{

    describe("a value object", function(){
        class TestValueObject extends Domain.ValueObject{
            constructor(public ID: string, public TestProperty: string[]){
                super();
            }
        }

        var testID = "123";
        var testArray = ["one", "two", "three"];
        var badArray = ["one", "two", "three", "four"];

        var testObj1 = new TestValueObject(testID, testArray);
        var testObj2 = new TestValueObject(testID, testArray);
        var testObj3 = new TestValueObject(testID, badArray);
        var testObj4 = new TestValueObject(IDGenerator.generate(), testArray);
        var testObj5 = new TestValueObject(IDGenerator.generate(), badArray);

        it("correctly compares two value objects with an array", function(){
            expect(testObj1.equals(testObj1)).toBeTruthy();
            expect(testObj1.equals(testObj2)).toBeTruthy();
            expect(testObj1.equals(testObj3)).toBeFalsy();
            expect(testObj1.equals(testObj4)).toBeFalsy();
            expect(testObj1.equals(testObj5)).toBeFalsy();
            expect(testObj3.equals(testObj4)).toBeFalsy();
            expect(testObj3.equals(testObj5)).toBeFalsy();
            expect(testObj4.equals(testObj5)).toBeFalsy();
        })

    });

    describe("a value object", function(){
        class InnerValueObject extends Domain.ValueObject{
            constructor(public One: number, public Two: number, public Three: number){
                super();
            }
        }

        class TestValueObject extends Domain.ValueObject{
            constructor(public ID: string, public TestProperty: Object){
                super();
            }
        }

        var testID = "123";
        var testObj = new InnerValueObject(1,2,3);
        var badObj = new InnerValueObject(1,2,4);

        var testObj1 = new TestValueObject(testID, testObj);
        var testObj2 = new TestValueObject(testID, testObj);
        var testObj3 = new TestValueObject(testID, badObj);
        var testObj4 = new TestValueObject(IDGenerator.generate(), testObj);
        var testObj5 = new TestValueObject(IDGenerator.generate(), badObj);

        it("correctly compares two value objects with an inner value object", function(){
            expect(testObj.equals(badObj)).toBeFalsy();
            expect(testObj1.equals(testObj1)).toBeTruthy();
            expect(testObj1.equals(testObj2)).toBeTruthy();
            expect(testObj1.equals(testObj3)).toBeFalsy();
            expect(testObj1.equals(testObj4)).toBeFalsy();
            expect(testObj1.equals(testObj5)).toBeFalsy();
            expect(testObj3.equals(testObj4)).toBeFalsy();
            expect(testObj3.equals(testObj5)).toBeFalsy();
            expect(testObj4.equals(testObj5)).toBeFalsy();
        })                    

    });

    describe("a value object", function(){

        class TestValueObject extends Domain.ValueObject{
            constructor(public ID: string, public TestProperty: Object){
                super();
            }
        }

        var testID = "123";
        var testObj = {"one":1,"two":2,"three":3};
        var badObj = {"one":1,"two":2,"three":4};

        var testObj1 = new TestValueObject(testID, testObj);
        var testObj2 = new TestValueObject(testID, testObj);
        var testObj3 = new TestValueObject(testID, badObj);
        var testObj4 = new TestValueObject(IDGenerator.generate(), testObj);
        var testObj5 = new TestValueObject(IDGenerator.generate(), badObj);

        it("correctly compares two value objects with an object", function(){
            expect(testObj1.equals(testObj1)).toBeTruthy();
            expect(testObj1.equals(testObj2)).toBeTruthy();
            expect(testObj1.equals(testObj3)).toBeFalsy();
            expect(testObj1.equals(testObj4)).toBeFalsy();
            expect(testObj1.equals(testObj5)).toBeFalsy();
            expect(testObj3.equals(testObj4)).toBeFalsy();
            expect(testObj3.equals(testObj5)).toBeFalsy();
            expect(testObj4.equals(testObj5)).toBeFalsy();
        })                    

    });

    describe("a value object", function(){

        class TestValueObject extends Domain.ValueObject{
            constructor(public ID: string, public TestProperty: Object){
                super();
            }
        }

        var testID = "123";
        var testObj = {"one":1,"two":{"one":1,"two":{"one":1,"two":2}}};
        var badObj = {"one":1,"two":{"one":1,"two":{"one":1,"two":3}}};

        var testObj1 = new TestValueObject(testID, testObj);
        var testObj2 = new TestValueObject(testID, testObj);
        var testObj3 = new TestValueObject(testID, badObj);


        it("correctly compares two value objects with a 3 level stack", function(){
            expect(testObj1.equals(testObj2)).toBeTruthy();
            expect(testObj1.equals(testObj3)).toBeFalsy();
        })                    

    });

    describe("a value object", function(){

        class TestValueObject extends Domain.ValueObject{
            constructor(public ID: string, public TestProperty: Object){
                super();
            }
        }

        var testID = "123";
        var testObj = {"one":1,"two":{"one":1,"two":{"one":1,"two":{"one":1,"two":2}}}};

        var testObj1 = new TestValueObject(testID, testObj);
        var testObj2 = new TestValueObject(testID, testObj);

        var errorMessage;

        Framework.ErrorService.Instance.clearOnThrowEvents();
        Framework.ErrorService.Instance.onThrow((message:string)=>{errorMessage = message});

        it("it fails when the stack is too deep", function(){
            expect(testObj1.equals(testObj2)).toBeFalsy();
            expect(errorMessage).toBe("stack overflow in value object comparison. avoid circular references in value objects");
        })                    

    });


}