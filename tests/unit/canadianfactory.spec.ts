import CanadianDebateFactory from "@/models/canadianDebateFactory"
import fifteenSeconds from "@/realizations/DebateConfigurations/fifteenSeconds";
import fourMinutes from "@/realizations/DebateConfigurations/fourMinutes";
import sevenMinutes from "@/realizations/DebateConfigurations/sevenMinutes";
import sixMinutes from "@/realizations/DebateConfigurations/sixMinutes";
import tenMinutes from "@/realizations/DebateConfigurations/tenMinutes";

describe("canadianFactory", ()=>{
    let canadianFactory:CanadianDebateFactory;
    let sixMin:sixMinutes
    let sevenMin:sevenMinutes;
    beforeEach(()=>{
        canadianFactory = new CanadianDebateFactory();
    })
    it("has default values",()=>{
        expect(canadianFactory.govMode).toBe("sevenThree")
        expect(canadianFactory.oppMode).toBe("split")
    }
    )
    it("will deliver a list according to specific modes", ()=>{
        canadianFactory.setGovMode("sixFour")
        canadianFactory.setOppMode("trad");
        const expectedConfigurationList = [new sixMinutes(), new fifteenSeconds(), new sevenMinutes(), new fifteenSeconds(), new sevenMinutes(), new fifteenSeconds(), new tenMinutes(), new fifteenSeconds(), new fourMinutes(), new fifteenSeconds()];
        const actualConfigurationList = canadianFactory.makeConfigList();
        expectedConfigurationList.forEach((val, index)=>{
            expect(val.equals(actualConfigurationList[index])).toBe(true)
    })
})
})