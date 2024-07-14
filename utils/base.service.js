class BaseService {
    constructor(model) {
        this.model = model;
    }

    async getAll(query, options) {
        return await this.model.paginate(query, options);
    }

    async getOne(id) {
        return await this.model.findById(id);
    }

    async create(data) {
        return await this.model.create(data);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async search(query, options) {
        return await this.model.paginate(query, options);
    }
}

module.exports = BaseService;
