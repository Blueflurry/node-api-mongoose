const BaseController = require("../../utils/base.controller");
const JobsService = require("./jobs.service");

class JobsController extends BaseController {
    constructor() {
        super(JobsService);
    }
}

module.exports = new JobsController();
