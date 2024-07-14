class BaseController {
    constructor(service) {
        this.service = service;
    }

    getAll = async (req, res, next) => {
        try {
            const { page = 1, limit = 10, ...query } = req.query;
            const options = { page, limit };
            const result = await this.service.getAll(query, options);
            res.success(result);
        } catch (err) {
            next(err);
        }
    };

    getOne = async (req, res, next) => {
        try {
            const result = await this.service.getOne(req.params.id);
            res.success(result);
        } catch (err) {
            next(err);
        }
    };

    create = async (req, res, next) => {
        try {
            const result = await this.service.create(req.body);
            res.success(result, 201);
        } catch (err) {
            next(err);
        }
    };

    update = async (req, res, next) => {
        try {
            const result = await this.service.update(req.params.id, req.body);
            res.success(result);
        } catch (err) {
            next(err);
        }
    };

    delete = async (req, res, next) => {
        try {
            await this.service.delete(req.params.id);
            res.success(null, 204);
        } catch (err) {
            next(err);
        }
    };

    search = async (req, res, next) => {
        try {
            const { page = 1, limit = 10, ...query } = req.body;
            const options = { page, limit };
            const result = await this.service.search(query, options);
            res.success(result);
        } catch (err) {
            next(err);
        }
    };
}

module.exports = BaseController;
