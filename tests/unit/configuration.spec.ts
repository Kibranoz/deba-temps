import fourMinutes from "@/realizations/DebateConfigurations/fourMinutes";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes"
import threeMinutes from "@/realizations/DebateConfigurations/threeMinutes";

describe("configurationModel", ()=>{
    it("determinates when opponent can talk", ()=>{
        let configuration = new sixMinutes();
        expect(configuration.getTimeWhenQuestionStartsToBeAllowed()).toBe(330)
    })
    it("determinates when an opponent can no longer be talking", ()=> {
        let configuration = new sevenMinutes();
        expect(configuration.getTimeWhenQuestionStopBeingAllowed()).toBe(60)
    })
    it("give a negative number if we are in an end configuration for time allowed", ()=> {
        let configuration = new threeMinutes();
        expect(configuration.getTimeWhenQuestionStartsToBeAllowed()).toBe(-10);
    })
    it("says that in a end configuration, question are not allowed",()=>{
        let configuration = new fourMinutes();
        expect(configuration.getTimeWhenQuestionStopBeingAllowed()).toBe(configuration.totalRoundTime)
    })

})