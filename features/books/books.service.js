const BaseService = require("../../utils/base.service");
const BooksModel = require("./books.model");

class BooksService extends BaseService {
    constructor() {
        super(BooksModel);
    }
}

module.exports = new BooksService();