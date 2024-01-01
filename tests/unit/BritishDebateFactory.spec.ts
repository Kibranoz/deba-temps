import BritishDebateFactory from "@/models/BritishDebateFactory";
import debateState from "@/models/debate";

describe("Brittish DebateFactory", ()=>{
    let VALID_AMOUNT_MINUTES = 5;
    let VALID_AMOUNT_SECONDS = 5*60;


    it("gives the correct amount of minutes", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[0].totalRoundTime).toBe(VALID_AMOUNT_SECONDS)
    })

    it("gives the correct round info for first round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[0].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for second round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[1].isMiddleRound()).toBeTruthy();
    })


    it("gives the correct round info for third round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[2].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for fourth round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[3].isMiddleRound()).toBeTruthy();
    })


    it("gives the correct round info for fifth round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[4].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for sixth round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[5].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for seventh round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[6].isMiddleRound()).toBeTruthy();
    })


    it("gives the correct round info for eighth round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[7].isMiddleRound()).toBeFalsy();
    })

    it("gives the correct round info for ninth round", ()=>{
        let britishDebate:debateState = BritishDebateFactory.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[8].isMiddleRound()).toBeFalsy();
    })








})