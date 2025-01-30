const BaseService = require("../../utils/base.service");
const StaysModel = require("./stays.model");

class StaysService extends BaseService {
    constructor() {
        super(StaysModel);
    }

    async searchAndSortByPrice(query) {
        const { page = 1, limit = 10, location = "goa", capacity = 3, nearbyPrice = 35000 } = query;

        // Validate inputs (optional, for robustness)
        if (!location || !capacity || !nearbyPrice || !amenities) {
            throw new Error("Required fields: location, capacity, nearbyPrice, amenities");
        }

        const queryPipeline = [
            {
                $match: {
                    $or: [{ "location.city": { $regex: location, $options: "i" } }, { "location.state": { $regex: location, $options: "i" } }],
                    "capacity.rooms": { $gte: capacity },
                },
            },
            {
                $addFields: {
                    priceDifference: { $abs: { $subtract: ["$price", nearbyPrice] } },
                },
            },
            {
                $sort: {
                    priceDifference: 1, // Closest price first
                },
            },
            {
                $skip: (page - 1) * limit,
            },
            {
                $limit: limit,
            },
        ];

        return await this.model.aggregate(queryPipeline);
    }
}

module.exports = new StaysService();
