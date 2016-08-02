namespace CQRSjs.Framework{
    
    export class TimeService{
        private static _instance: TimeService;
        
        static get Instance(){
            if(TimeService._instance == null){
                TimeService._instance = new TimeService();
            }
            return TimeService._instance;
        }

        private _yearsAdded = 0;
        private _monthsAdded = 0;
        private _daysAdded = 0;
        private _hoursAdded = 0;
        private _minutesAdded = 0;
        private _secondsAdded = 0;
        private _millisecondsAdded = 0;
        
        private getTime(){
            var realTime = new Date();
            realTime.setFullYear(realTime.getFullYear() + this._yearsAdded);
            realTime.setMonth(realTime.getMonth() + this._monthsAdded);
            realTime.setDate(realTime.getDate() + this._daysAdded);
            realTime.setHours(realTime.getHours() + this._hoursAdded);
            realTime.setMinutes(realTime.getMinutes() + this._minutesAdded);
            realTime.setSeconds(realTime.getSeconds() + this._secondsAdded);
            realTime.setMilliseconds(realTime.getMilliseconds() + this._millisecondsAdded);

            return realTime;
        }

        reset(){
            this._yearsAdded = 0;
            this._monthsAdded = 0;
            this._daysAdded = 0;
            this._hoursAdded = 0;
            this._minutesAdded = 0;
            this._secondsAdded = 0;
            this._millisecondsAdded = 0;
        }

        addYears(years: number){
            if(Math.round(years) != years){
                ErrorService.throw("addYears only accepts integer values for years in the timeService");
            }
            this._yearsAdded += years;
        }

        addMonths(months: number){
            if(Math.round(months) != months){
                ErrorService.throw("addMonths only accepts integer values for months in the timeService");
            }
            this._monthsAdded += months;
        }

        addDays(days: number){
            if(Math.round(days) != days){
                ErrorService.throw("addDays only accepts integer values for days in the timeService");
            }
            this._daysAdded += days;
        }

        addHours(hours: number){
            if(Math.round(hours) != hours){
                ErrorService.throw("addHours only accepts integer values for hours in the timeService");
            }
            this._hoursAdded += hours;
        }

        addMinutes(minutes: number){
            if(Math.round(minutes) != minutes){
                ErrorService.throw("addMinutes only accepts integer values for minutes in the timeService");
            }
            this._minutesAdded += minutes;
        }

        addSeconds(seconds: number){
            if(Math.round(seconds) != seconds){
                ErrorService.throw("addSeconds only accepts integer values for seconds in the timeService");
            }
            this._secondsAdded += seconds;
        }

        addMilliseconds(milliseconds: number){
            if(Math.round(milliseconds) != milliseconds){
                ErrorService.throw("addMilliseconds only accepts integer values for milliseconds in the timeService");
            }
            this._millisecondsAdded += milliseconds;
        }

        now(){
            return this.getTime();
        }
        
        nowTicks(){
            return this.getTime().getTime();
        }
        
        today(){
            var localTime = this.getTime();
            localTime.setHours(0);
            localTime.setMinutes(0);
            localTime.setSeconds(0);
            localTime.setMilliseconds(0);
            
            return localTime;            
        }
        
    }
    
}