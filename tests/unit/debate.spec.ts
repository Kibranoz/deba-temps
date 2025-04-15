import BritishDebateBuilder from "@/models/BritishDebateBuilder";
import Round from "@/models/round";
import debateState from "@/models/debate";
//import  debate from "@/models/debate"

describe("debateModel", ()=>{
    let debateState:debateState;
    beforeEach(()=>{
        debateState= BritishDebateBuilder.fromMinutes(5);
        debateState.getTimer().sendNotification = ()=>{

        }
        debateState.getTimer().play()

        debateState.getTimer().tick();

        //déclarer ailleurs
        //eightMinutes = new eightMinutes();
        //let thirtySeconds:thirtySeconds = new thirtySeconds()
        //let debate = new debate([eightMinutes,thirtySeconds,eightMinutes,thirtySeconds], ["first person", "first person", "second person", "second person", "third person", "third person", "fourth person", "fourth person"]);
    });
    it("will go to the next configuration", ()=> {
        debateState.nextConfiguration();
        debateState.getTimer().tick();
        expect(debateState.configurationIndex).toBe(1);

    })
    it("will go back to the previous configuration", ()=>{
        debateState.configurationIndex = 3;
        debateState.previousConfiguration()
        debateState.getTimer().tick();
        expect(debateState.configurationIndex).toBe(2)
    })


    it("when configuration index is 0, it will go back to the last configuration", ()=>{
        debateState.configurationIndex = 0;
        debateState.previousConfiguration()
        debateState.getTimer().tick();
        expect(debateState.configurationIndex).toBe(debateState.configurations.length - 1)
    })
    it("when time is within bounds, then poi are allowed", ()=>{
        debateState.getCurrentConfiguration().timeIsAboveLowerBound = (currentTime:number)=>{return true};
        debateState.getCurrentConfiguration().timeIsBelowUpperBound = (currentTime:number)=>{return true};

        expect(debateState.getIfPOIAllowed()).toBe(true);

    })

    it("when faast forwarding, no sound should be able to play", ()=>{
        debateState.fastForward()
        expect(debateState.isSwitchingRound()).toBe(true)
    })

    it("when fast backwarding, no sound should be able to play", ()=>{
        debateState.fastBackward()
        expect(debateState.isSwitchingRound()).toBe(true)
    })

    it("when time is not within bounds, then poi are  not allowed", ()=>{
        debateState.getCurrentConfiguration().timeIsAboveLowerBound = (currentTime:number)=>{return false};
        debateState.getCurrentConfiguration().timeIsBelowUpperBound = (currentTime:number)=>{return true};

        expect(debateState.getIfPOIAllowed()).toBe(false);

    })
});