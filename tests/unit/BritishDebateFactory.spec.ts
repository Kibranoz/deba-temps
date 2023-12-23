import BritishDebateFactory from "@/models/BritishDebateFactory";
import debateState from "@/models/debate";

describe("Brittish DebateFactory", ()=>{
    let VALID_AMOUNT_MINUTES = 5;
    let VALID_AMOUNT_SECONDS = 5*60;


    it("gives the correct amount of minutes", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[0].totalRoundTime).toBe(VALID_AMOUNT_SECONDS)
    })

})