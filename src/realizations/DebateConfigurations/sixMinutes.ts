import configuration from "@/models/configurations"

class sixMinutes extends configuration {
    constructor() {
        super();
    }
    amountOfSecondsProtectedInTheBeginning = 30;
    amountOfSecondsProtectedInTheEnd = 30;
    totalRoundTime = 6*60;
    isMiddle = true;
}

export default sixMinutes;