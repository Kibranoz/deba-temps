import BritishDebateBuilder from "@/models/BritishDebateBuilder";
import debateState from "@/models/debate";

describe("British Debate builder", ()=>{
    let VALID_AMOUNT_MINUTES = 5;
    let VALID_AMOUNT_SECONDS = 5*60;


    it("gives the correct amount of minutes", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[0].totalRoundTime).toBe(VALID_AMOUNT_SECONDS)
    })

    it("gives the correct round info for first round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[0].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for second round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[1].isMiddleRound()).toBeTruthy();
    })


    it("gives the correct round info for third round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[2].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for fourth round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[3].isMiddleRound()).toBeTruthy();
    })


    it("gives the correct round info for fifth round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[4].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for sixth round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[5].isMiddleRound()).toBeTruthy();
    })

    it("gives the correct round info for seventh round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[6].isMiddleRound()).toBeFalsy();
    })


    it("gives the correct round info for eighth round", ()=>{
        let britishDebate:debateState = BritishDebateBuilder.fromMinutes(VALID_AMOUNT_MINUTES);
        expect(britishDebate.configurations[7].isMiddleRound()).toBeFalsy();
    })
})