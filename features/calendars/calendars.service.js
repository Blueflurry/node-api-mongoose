const BaseService = require("../../utils/base.service");
const CalendarsModel = require("./calendars.model");

class CalendarsService extends BaseService {
    constructor() {
        super(CalendarsModel);
    }
}

module.exports = new CalendarsService();