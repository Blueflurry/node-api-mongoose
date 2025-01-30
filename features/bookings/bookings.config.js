module.exports = {
    bookingsStatus: Object.freeze({
        failed: {
            name: "Failed",
            value: 0,
        },
        active: {
            name: "Active",
            value: 1,
        },
        success: {
            name: "Success",
            value: 2,
        },
        partialPaid: {
            name: "Partial Paid",
            value: 3,
        },
        fullyPaid: {
            name: "Fully Paid",
            value: 4,
        },
    }),
    paymentSources: Object.freeze({
        cash: {
            name: "Cash",
            value: 0,
        },
        upi: {
            name: "UPI",
            value: 1,
        },
        bankTransfer: {
            name: "Bank Transfer",
            value: 2,
        },
        paymentGateway: {
            name: "Payment Gateway",
            value: 3,
        },
    }),
};
