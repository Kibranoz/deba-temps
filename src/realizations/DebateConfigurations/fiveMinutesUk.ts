import configuration from "@/models/configurations"

class fiveMinutesUk extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 5*60;
    isMiddle = true;
}

export default fiveMinutesUk;