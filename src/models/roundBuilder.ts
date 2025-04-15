import debateState from "./debate";
import Round from "./round";

class RoundBuilder {
    setRoles(role:string) {
        this.round.setRole(role)
		return this
    }

    private round:Round;


	constructor() {
		this.round = new Round()
	}

	setMinutes(minutes:number){
		this.round.setTotalRoundTime(minutes*60);
		return this
	}

	setToBeClosingRound() {
		this.round.setIsMiddleRound(false);
		this.setProtectedAmount(0);
		return this
	}

	setProtectedAmount(protectedAmount:number) {
		this.round.setAmountOfSecondsProtectedInTheBeginning(protectedAmount)
		this.round.setAmountOfSecondsProtectedInTheEnd(protectedAmount)
		return this
	}
	overrideProtectedEndAmount(protectedEndAmount:number) {
		this.round.setAmountOfSecondsProtectedInTheEnd(protectedEndAmount)
		return this
	}

	getResult() {
		return this.round
	}

}
export default RoundBuilder