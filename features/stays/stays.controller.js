const BaseController = require("../../utils/base.controller");
const StaysService = require("./stays.service");

class StaysController extends BaseController {
    constructor() {
        super(StaysService);
    }

    search = async (req, res, next) => {
        try {
            const result = await this.service.searchAndSortByPrice(req.body);
            res.success(result, 200, "Data fetched successfully.");
        } catch (err) {
            res.error(err, 500, "There was some error in fetching data.");
        }
    };
}

module.exports = new StaysController();
