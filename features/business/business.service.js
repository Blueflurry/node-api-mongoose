const BaseService = require("../../utils/base.service");
const BusinessModel = require("./business.model");

class BusinessService extends BaseService {
    constructor() {
        super(BusinessModel);
    }
}

module.exports = new BusinessService();