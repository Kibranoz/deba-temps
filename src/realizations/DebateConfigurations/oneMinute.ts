import configuration from "@/models/configurations"

class oneMinute extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 60;
    isMiddle = false;
    isGrace = false;
}

export default oneMinute