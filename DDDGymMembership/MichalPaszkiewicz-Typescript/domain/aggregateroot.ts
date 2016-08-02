/// <reference path="./entitybase.ts" />

namespace CQRSjs.Domain{

    export class EventAction{
        EventName: string;
        Action: (e: Framework.Event) => void;

        constructor(eventName: string, action: (e: Framework.Event) => void){
            this.EventName = eventName;
            this.Action = action;
        }
    }

    export class AggregateRoot extends EntityBase{

        protected _eventActions: EventAction[] = [];

        // event actions must be registered in constructor.
        protected registerEventAction(eventAction: EventAction){
            this._eventActions.push(eventAction);
        }

        applyEvent(event: Framework.Event){
            this._eventActions
                .filter((ea: EventAction) => { return ea.EventName == event.EventName })
                .forEach((ea: EventAction) => { ea.Action(event); });
            Framework.EventStoreService.Instance.store(event);
        }

        constructor(id: string){
            super(id);
        }
    }

    // class Bob extends AggregateRoot{
    //     constructor(){
    //         super();

    //         // you must do this to ensure action performs on correct object
    //         var self = this;

    //         this.registerEventAction(new EventAction("lol", (e: Framework.Event) => {
    //             self.ID = e.AggregateRootID;
    //         }));
    //     }
    // }


}