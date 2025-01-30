const BaseController = require('../../utils/base.controller');
const CalendarsService = require('./calendars.service');

class CalendarsController extends BaseController {
    constructor() {
        super(CalendarsService);
    }
}

module.exports = new CalendarsController();