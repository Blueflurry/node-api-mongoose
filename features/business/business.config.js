module.exports = {
    businessStatus: Object.freeze({
        disabled: {
            name: "Disabled",
            value: 0,
        },
        active: {
            name: "Active",
            value: 1,
        },
    }),
    businessType: Object.freeze({
        stay: {
            name: "Stay",
            value: 0,
        },
        club: {
            name: "Club",
            value: 1,
        },
        dining: {
            name: "Dining",
            value: 2,
        },
        taxi: {
            name: "Taxi",
            value: 3,
        },
        rental: {
            name: "Rental",
            value: 4,
        },
        hospitality: {
            name: "Hospitality",
            value: 5,
        },
    }),
    earningMode: Object.freeze({
        comission: {
            name: "Commission",
            value: 0,
        },
        markup: {
            name: "Markup",
            value: 1,
        },
    }),
};
