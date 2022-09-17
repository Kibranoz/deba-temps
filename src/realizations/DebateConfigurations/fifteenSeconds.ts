import configuration from "@/models/configurations"
import { def } from "@vue/shared";

class fifteenSeconds extends configuration {
    constructor() {
        super();
    }
    totalRoundTime = 15;
    isMiddle = false;
    isGrace = true;
}

export default fifteenSeconds