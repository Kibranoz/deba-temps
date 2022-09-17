import configuration from "@/models/configurations"

class fiveMinutes extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 5*60;
    isMiddle = false;
}

export default fiveMinutes;