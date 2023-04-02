import configuration from "@/models/configurations"

class sixMinutesUk extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 6*60;
    isMiddle = true;
}

export default sixMinutesUk;