import RoundBuilder from "@/models/roundBuilder";

describe("configurationModel", ()=>{
    const TIME_WITHIN_BOUNDS = 100000;
    const TIME_BELOW_LOWER_BOUND = 3000;
    const TIME_ABOVE_UPPER_BOUND = 359000;
    const NEVER = -10
    const ONE_MINUTE = 60
    const TIME_REMAINING_WHEN_QUESTIONS_STARTS_ALLOWED = 300;
    it("determinates when opponent can talk", ()=>{
        let configuration = new RoundBuilder().setMinutes(6).getResult()
        expect(configuration.getTimeWhenQuestionStartsToBeAllowed()).toBe(TIME_REMAINING_WHEN_QUESTIONS_STARTS_ALLOWED)
    })
    it("determinates when an opponent can no longer be talking", ()=> {
        const configuration = new RoundBuilder().setMinutes(7).getResult()
        expect(configuration.getTimeWhenQuestionStopBeingAllowed()).toBe(ONE_MINUTE)
    })
    it("give a negative number if we are in an end configuration for time allowed", ()=> {
        let configuration = new RoundBuilder().setMinutes(3).setToBeClosingRound().getResult()
        expect(configuration.getTimeWhenQuestionStartsToBeAllowed()).toBe(NEVER);
    })
    it("says that in a end configuration, question are not allowed",()=>{
        let configuration = new RoundBuilder().setMinutes(4).setToBeClosingRound().getResult()
        expect(configuration.getTimeWhenQuestionStopBeingAllowed()).toBe(configuration.getTotalRoundTime())
    })
    
    it("can tell if two configurations are equals",()=>{
        const aConfig = new RoundBuilder().setMinutes(7).getResult()
        const sameConfig = new RoundBuilder().setMinutes(7).getResult()
        const differentConfig = new RoundBuilder().setMinutes(6).getResult()
        expect(aConfig.equals(sameConfig)).toBe(true);
        expect(aConfig.equals(differentConfig)).toBe(false);
    }
    )

    it("can determine whether current time is below upper bound", ()=>{
        const configuration = new RoundBuilder().setMinutes(6).getResult()
        expect(configuration.timeIsBelowUpperBound(TIME_WITHIN_BOUNDS)).toBe(true)
        expect(configuration.timeIsBelowUpperBound(TIME_ABOVE_UPPER_BOUND)).toBe(false)
    }
    )
    it("can determine whether current time is above lower bound", ()=>{
        const configuration = new RoundBuilder().setMinutes(6).getResult()
        expect(configuration.timeIsAboveLowerBound(TIME_WITHIN_BOUNDS)).toBe(true)
        expect(configuration.timeIsAboveLowerBound(TIME_BELOW_LOWER_BOUND)).toBe(false)
    }
    )

})