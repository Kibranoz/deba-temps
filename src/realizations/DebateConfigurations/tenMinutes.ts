import configuration from "@/models/configurations"

class tenMinutes extends configuration {
    constructor() {
        super();
    }
    amountOfSecondsProtectedInTheBeginning = 60;
    amountOfSecondsProtectedInTheEnd = 4*60;
    totalRoundTime = 10*60;
    isMiddle = true;
}

export default tenMinutes; 