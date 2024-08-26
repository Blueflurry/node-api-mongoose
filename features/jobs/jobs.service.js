const BaseService = require("../../utils/base.service");
const JobsModel = require("./jobs.model");

class JobsService extends BaseService {
    constructor() {
        super(JobsModel);
    }
}

module.exports = new JobsService();