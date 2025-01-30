const BaseService = require("../../utils/base.service");
const BookingsModel = require("./bookings.model");

class BookingsService extends BaseService {
    constructor() {
        super(BookingsModel);
    }
}

module.exports = new BookingsService();