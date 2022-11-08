class configuration{
    totalRoundTime = 0
    isMiddle = false
    isGrace = false
    amountOfSecondsProtectedInTheBeginning = 60
    amountOfSecondsProtectedInTheEnd = 60

    getConfigurationTotalRunTime():number{
        return this.totalRoundTime;
    }
    getTimeWhenQuestionStartsToBeAllowed():number{
        if (this.isMiddle) {
            return this.totalRoundTime - this.amountOfSecondsProtectedInTheBeginning;
        }
        else {
            return -10; //never
        }

    }

    getTimeWhenQuestionStopBeingAllowed():number{
        if (this.isMiddle) {
            return this.amountOfSecondsProtectedInTheEnd;
        }
        else {
            return this.totalRoundTime
        }
    }
    equals(otherConfig:configuration):boolean {
        if (this.totalRoundTime == otherConfig.totalRoundTime){
            if (this.isMiddle == otherConfig.isMiddle){
                if (this.isGrace == otherConfig.isGrace){
                    if (this.amountOfSecondsProtectedInTheBeginning == otherConfig.amountOfSecondsProtectedInTheBeginning){
                        if (this.amountOfSecondsProtectedInTheEnd == otherConfig.amountOfSecondsProtectedInTheEnd){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

}

export default configuration;