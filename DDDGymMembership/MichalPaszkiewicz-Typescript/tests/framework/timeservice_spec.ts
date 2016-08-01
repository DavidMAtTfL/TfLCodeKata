/// <reference path="../helpers/loadForTest.ts" />
eval(loadModule("framework"));

module CQRSjs.Test{

    describe("the time service", function(){
        
        var beforeTime = new Date();
        var now = Framework.TimeService.Instance.now();
        var afterTime = new Date();

        it("should have the correct time for now", function(){
            expect(beforeTime.getTime() <= now.getTime()).toBeTruthy();
            expect(afterTime.getTime() >= now.getTime()).toBeTruthy();
        });
    });

    describe("the time service", function(){

        var beforeTime = new Date();
        var nowTicks = Framework.TimeService.Instance.nowTicks();
        var afterTime = new Date();

        it("should have the correct time for nowTicks", function(){
            expect(beforeTime.getTime() <= nowTicks).toBeTruthy();
            expect(afterTime.getTime() >= nowTicks).toBeTruthy();
        });

    });

    describe("the time service", function(){
        var now = new Date();

        var beforeTime = new Date(now.getTime() - 24*60*60*1000);
        var today = Framework.TimeService.Instance.today();
        var afterTime = new Date();

        it("should have the correct time for today", function(){
            expect(beforeTime.getTime()).toBeLessThan(today.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(today.getTime());
        });

    });

    describe("the time service", function(){
        var now = new Date();

        var beforeTime = new Date(now.getTime() + 364*24*60*60*1000);
        Framework.TimeService.Instance.addYears(1);
        var today = Framework.TimeService.Instance.today();
        var afterTime = new Date(now.getTime() + 367*24*60*60*1000);

        it("allows year manipulation", function(){
            expect(beforeTime.getTime()).toBeLessThan(today.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(today.getTime());
        });

    });

    describe("the time service", function(){
        var now = new Date();

        Framework.TimeService.Instance.reset();
        var beforeTime = new Date(now.getTime() + 28*24*60*60*1000);
        Framework.TimeService.Instance.addMonths(1);
        var today = Framework.TimeService.Instance.today();
        var afterTime = new Date(now.getTime() + 32*24*60*60*1000);

        it("allows month manipulation", function(){
            expect(beforeTime.getTime()).toBeLessThan(today.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(today.getTime());
        });

    });

    describe("the time service", function(){
        Framework.TimeService.Instance.reset();
        var beforeTime = new Date();
        Framework.TimeService.Instance.addDays(1);
        var now = Framework.TimeService.Instance.now();
        var afterTime = new Date(beforeTime.getTime() + 24*60*61*1000);

        it("allows day manipulation", function(){
            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){
        Framework.TimeService.Instance.reset();
        var beforeTime = new Date();
        Framework.TimeService.Instance.addHours(1);
        var now = Framework.TimeService.Instance.now();
        var afterTime = new Date(beforeTime.getTime() + 60*60*1000 + 10);

        it("allows hour manipulation", function(){
            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){
        Framework.TimeService.Instance.reset();
        var beforeTime = new Date();
        Framework.TimeService.Instance.addMinutes(1);
        var now = Framework.TimeService.Instance.now();
        var afterTime = new Date(beforeTime.getTime() + 60*1000 + 10);

        it("allows minute manipulation", function(){
            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){
        Framework.TimeService.Instance.reset();
        var beforeTime = new Date();
        Framework.TimeService.Instance.addSeconds(10);
        var now = Framework.TimeService.Instance.now();
        var afterTime = new Date(beforeTime.getTime() + 10*1000 + 50);

        it("allows second manipulation", function(){
            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

    describe("the time service", function(){
        Framework.TimeService.Instance.reset();
        Framework.TimeService.Instance.addMilliseconds(100);
        
        var beforeTime = new Date();
        var now = Framework.TimeService.Instance.now();
        var afterTime = new Date(beforeTime.getTime() + 300);

        it("allows millisecond manipulation", function(){
            expect(beforeTime.getTime()).toBeLessThan(now.getTime());
            expect(afterTime.getTime()).toBeGreaterThan(now.getTime());
        });

    });

}