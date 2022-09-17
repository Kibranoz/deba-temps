import configuration from "@/models/configurations"

class sevenMinutes extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 7*60;
    isMiddle = true;
}

export default sevenMinutes;