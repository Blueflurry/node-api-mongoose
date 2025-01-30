const BaseController = require("../../utils/base.controller");
const BusinessService = require("./business.service");
const Auth = require("../auth/auth.service");
const Calendars = require("../calendars/calendars.service");

class BusinessController extends BaseController {
    constructor() {
        super(BusinessService);
    }
}

module.exports = new BusinessController();
