const BaseService = require("../../utils/base.service");
const FinanceModel = require("./finance.model");

class FinanceService extends BaseService {
    constructor() {
        super(FinanceModel);
    }
}

module.exports = new FinanceService();