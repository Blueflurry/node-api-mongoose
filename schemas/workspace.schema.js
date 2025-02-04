const User = require("./user.schema");
const authConfig = require("../features/auth/auth.config");
const { Field } = require("../utils/schemas");

module.exports = {
    $schemaName: "Workspace",
    $apiSlug: "auth",
    type: new Field({
        name: "Type",
        type: Number,
        required: true,
        default: authConfig.workspaceTypes.profile,
        enum: Object.values(authConfig.workspaceTypes),
        validator: null,
        errorMessage: "",
        showInTable: true,
        showInForm: true,
        fullwidth: false,
        sortAsc: (a, b) => a - b,
        sortDesc: (a, b) => b - a,
        filter: (type, check) => +type === +check,
    }),
    scope: new Field({
        name: "Scope",
        type: Number,
        required: true,
        default: authConfig.workspaceScopes.profile,
        enum: Object.values(authConfig.workspaceScopes),
        validator: null,
        errorMessage: "",
        showInTable: true,
        showInForm: true,
        fullwidth: false,
        sortAsc: (a, b) => a - b,
        sortDesc: (a, b) => b - a,
        filter: (type, check) => +type === +check,
    }),
    admin: new Field({
        name: "User",
        type: User,
        required: true,
        default: null,
        enum: null,
        showInTable: true,
        showInForm: true,
        fullwidth: false,
    }),
    status: new Field({
        name: "Status",
        type: Number,
        required: true,
        default: authConfig.workspaceStatus.active,
        enum: Object.values(authConfig.workspaceStatus),
        validator: null,
        errorMessage: "",
        showInTable: true,
        showInForm: false,
        fullwidth: false,
        sortAsc: (a, b) => a - b,
        sortDesc: (a, b) => b - a,
        filter: (status, check) => +status === +check,
    }),
    data: new Field({
        name: "Data",
        type: Object,
        required: false,
        default: null,
        enum: null,
        validator: null,
        errorMessage: "",
        showInTable: true,
        showInForm: false,
        fullwidth: false,
    }),
    legal: {
        taxId: new Field({
            name: "Tax ID",
            type: String,
            required: false,
            unique: false,
            default: null,
            enum: null,
            validator: (value) => validator.isLength(value, { min: 10, max: 10 }),
            errorMessage: "Tax ID should be 10 characters long",
            showInTable: false,
            showInForm: true,
            fullWidth: false,
            sortAsc: (a, b) => a.localeCompare(b),
            sortDesc: (a, b) => b.localeCompare(a),
            filter: (taxId, check) => taxId.toLowerCase().includes(check.toLowerCase()),
        }),
        taxIdUrl: new Field({
            name: "Tax ID URL",
            type: String,
            required: false,
            unique: false,
            default: null,
            enum: null,
            validator: (value) => validator.isURL(value),
            errorMessage: "Tax ID URL should be a valid url",
            showInTable: false,
            showInForm: true,
            fullWidth: false,
        }),
        govtId: new Field({
            name: "Govt ID",
            type: String,
            required: false,
            unique: false,
            default: null,
            enum: null,
            validator: (value) => validator.isLength(value, { min: 12, max: 12 }),
            errorMessage: "Govt ID should be 12 characters long",
            showInTable: false,
            showInForm: true,
            fullWidth: false,
            sortAsc: (a, b) => a.localeCompare(b),
            sortDesc: (a, b) => b.localeCompare(a),
            filter: (govtId, check) => govtId.toLowerCase().includes(check.toLowerCase()),
        }),
        govtIdUrl: new Field({
            name: "Govt ID URL",
            type: String,
            required: false,
            unique: false,
            default: null,
            enum: null,
            validator: (value) => validator.isURL(value),
            errorMessage: "Govt ID URL should be a valid url",
            showInTable: false,
            showInForm: true,
            fullWidth: false,
        }),
        businessId: new Field({
            name: "Business ID",
            type: String,
            required: false,
            unique: false,
            default: null,
            enum: null,
            validator: (value) => validator.isLength(value, { min: 15, max: 15 }),
            errorMessage: "Business ID should be 15 characters long",
            showInTable: false,
            showInForm: true,
            fullWidth: false,
            sortAsc: (a, b) => a.localeCompare(b),
            sortDesc: (a, b) => b.localeCompare(a),
            filter: (businessId, check) => businessId.toLowerCase().includes(check.toLowerCase()),
        }),
        businessIdUrl: new Field({
            name: "Business ID URL",
            type: String,
            required: false,
            unique: false,
            default: null,
            enum: null,
            validator: (value) => validator.isURL(value),
            errorMessage: "Business ID URL should be a valid url",
            showInTable: false,
            showInForm: true,
            fullWidth: false,
        }),
        gst: new Field({
            name: "GST No.",
            type: String,
            getter: function () {
                // Regular function
                return this.businessId;
            },
            setter: function (value) {
                // Regular function
                this.businessId = value;
            },
            showInTable: true,
            sortAsc: (a, b) => a.localeCompare(b),
            sortDesc: (a, b) => b.localeCompare(a),
            filter: (businessId, check) => businessId.toLowerCase().includes(check.toLowerCase()),
        }),
        gstUrl: new Field({
            name: "GST URL",
            type: String,
            getter: function () {
                // Regular function
                return this.businessIdUrl;
            },
            setter: function (value) {
                // Regular function
                this.businessIdUrl = value;
            },
            showInTable: true,
        }),
        pan: new Field({
            name: "Pan No.",
            type: String,
            getter: function () {
                // Regular function
                return this.taxId;
            },
            setter: function (value) {
                // Regular function
                this.taxId = value;
            },
            showInTable: true,
            sortAsc: (a, b) => a.localeCompare(b),
            sortDesc: (a, b) => b.localeCompare(a),
            filter: (taxId, check) => taxId.toLowerCase().includes(check.toLowerCase()),
        }),
        panIdUrl: new Field({
            name: "Pan URL",
            type: String,
            getter: function () {
                // Regular function
                return this.taxIdUrl;
            },
            setter: function (value) {
                // Regular function
                this.taxIdUrl = value;
            },
            showInTable: true,
        }),
        aadhaar: new Field({
            name: "Aadhaar No.",
            type: String,
            getter: function () {
                // Regular function
                return this.govtId;
            },
            setter: function (value) {
                // Regular function
                this.govtId = value;
            },
            showInTable: true,
            sortAsc: (a, b) => a.localeCompare(b),
            sortDesc: (a, b) => b.localeCompare(a),
            filter: (taxId, check) => taxId.toLowerCase().includes(check.toLowerCase()),
        }),
        aadhaarUrl: new Field({
            name: "Aadhaar URL",
            type: String,
            getter: function () {
                // Regular function
                return this.govtIdUrl;
            },
            setter: function (value) {
                // Regular function
                this.govtIdUrl = value;
            },
            showInTable: true,
        }),
    },
};
