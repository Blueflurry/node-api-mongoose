const BaseController = require('../../utils/base.controller');
const FinanceService = require('./finance.service');

class FinanceController extends BaseController {
    constructor() {
        super(FinanceService);
    }
}

module.exports = new FinanceController();