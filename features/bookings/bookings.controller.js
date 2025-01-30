const BaseController = require("../../utils/base.controller");
const BookingsService = require("./bookings.service");
const Auth = require("../auth/auth.service");

class BookingsController extends BaseController {
    constructor() {
        super(BookingsService);
    }
}

module.exports = new BookingsController();
