import Round from "@/models/round";
import RoundBuilder from "@/models/roundBuilder"

describe("Round builder", ()=>{
    const AMOUNT_OF_MINUTES = 3;
    const AMOUNT_OF_SECONDS = 3*60;
    const PROTECTED_AMOUNT = 30;
    const ROLE = "PRIME MINISTER"

    it("will set the minutes in seconds",()=> {
        let builtRound:Round = new RoundBuilder().setMinutes(AMOUNT_OF_MINUTES).getResult();
        expect(builtRound.getConfigurationTotalRunTime()).toBe(AMOUNT_OF_SECONDS)
    })
    it("will be closing round when setting it to be that", ()=>{
        let builtRound:Round = new RoundBuilder().setToBeClosingRound().getResult()
        expect(builtRound.isMiddleRound()).toBeFalsy();
    })
    it("will set both amount in the beginning and in the end of protected time", ()=>{
        let builtRound:Round = new RoundBuilder().setProtectedAmount(PROTECTED_AMOUNT).getResult();
        expect(builtRound.getAmountOfSecondsProtectedInTheEnd()).toBe(PROTECTED_AMOUNT)
        expect(builtRound.getAmountOfSecondsProtectedInTheBeginning()).toBe(PROTECTED_AMOUNT)
    })

    it("will set roles string", ()=>{
        let builtRound:Round = new RoundBuilder().setRoles(ROLE).getResult();
        expect(builtRound.getRole()).toBe(ROLE)
    })
})