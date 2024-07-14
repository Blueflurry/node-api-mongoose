const BaseController = require('../../utils/base.controller');
const BooksService = require('./books.service');

class BooksController extends BaseController {
    constructor() {
        super(BooksService);
    }
}

module.exports = new BooksController();