
class Round{

    private totalRoundTime = 0
    private middleRound = true;
    private amountOfSecondsProtectedInTheBeginning = 60
    private amountOfSecondsProtectedInTheEnd = 60
    private role = ""


    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }


    public getTotalRoundTime(): number {
        return this.totalRoundTime;
    }

    public getTotalRoundTimeInMinutes(){
        return this.totalRoundTime / 60
    }

    public setTotalRoundTime(totalRoundTime: number): void {
        this.totalRoundTime = totalRoundTime;
    }

    public isMiddleRound(): boolean {
        return this.middleRound;
    }

    public setIsMiddleRound(isMiddle: boolean): void {
        this.middleRound = isMiddle;
    }

    public getAmountOfSecondsProtectedInTheBeginning(): number {
        return this.amountOfSecondsProtectedInTheBeginning;
    }

    public setAmountOfSecondsProtectedInTheBeginning(amountOfSecondsProtectedInTheBeginning: number): void {
        this.amountOfSecondsProtectedInTheBeginning = amountOfSecondsProtectedInTheBeginning;
    }

    public getAmountOfSecondsProtectedInTheEnd(): number {
        return this.amountOfSecondsProtectedInTheEnd;
    }

    public setAmountOfSecondsProtectedInTheEnd(amountOfSecondsProtectedInTheEnd: number): void {
        this.amountOfSecondsProtectedInTheEnd = amountOfSecondsProtectedInTheEnd;
    }


    getConfigurationTotalRunTime():number{
        return this.totalRoundTime;
    }
    timeIsBelowUpperBound(currentTime:number):boolean {
         return currentTime <= this.getTimeWhenQuestionStartsToBeAllowed() * 1000
    }
    timeIsAboveLowerBound(currentTime:number):boolean {
        return currentTime > this.getTimeWhenQuestionStopBeingAllowed() * 1000
    }
    getTimeWhenQuestionStartsToBeAllowed():number{
        if (this.middleRound) {
            return this.totalRoundTime - this.amountOfSecondsProtectedInTheBeginning;
        }
        else {
            return -10; //never
        }

    }


    getTimeWhenQuestionStopBeingAllowed():number{
        if (this.middleRound) {
            return this.amountOfSecondsProtectedInTheEnd;
        }
        else { 
            return this.totalRoundTime
        }
    }
    equals(otherConfig:Round):boolean {
        if (this.totalRoundTime == otherConfig.totalRoundTime){
            if (this.middleRound == otherConfig.middleRound){
                    if (this.amountOfSecondsProtectedInTheBeginning == otherConfig.amountOfSecondsProtectedInTheBeginning){
                        if (this.amountOfSecondsProtectedInTheEnd == otherConfig.amountOfSecondsProtectedInTheEnd){
                            return true;
                        }
                    }
            }
        }
        return false;
    }

}
export default Round;