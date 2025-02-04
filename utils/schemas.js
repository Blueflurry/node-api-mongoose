const mongoose = require("mongoose");
const userSchema = require("../schemas/user.schema");

class Field {
    constructor(value) {
        // Mongoose Schema Field Properties
        this.name = value.name;
        this.type = value.type;
        this.required = value.required;
        this.unique = value.unique;
        this.default = value.default;
        this.enum = value.enum;
        this.validator = value.validator;
        this.errorMessage = value.errorMessage;
        this.select = value.select || true;

        // Mongoose Schema Virtual Fields
        this.getter = value.getter;
        this.setter = value.setter;

        // Mongoose Schema Lifecycle 'Pre' Hooks
        if (value.pre) {
            this.pre = {
                validate: value.validate,
                save: value.save,
                remove: value.remove,
                updateOne: value.updateOne,
                deleteOne: value.deleteOne,
                find: value.find,
                findOne: value.findOne,
                findOneAndUpdate: value.findOneAndUpdate,
                findOneAndDelete: value.findOneAndDelete,
                findOneAndRemove: value.findOneAndRemove,
                updateMany: value.updateMany,
                deleteMany: value.deleteMany,
            };
        }

        // Mongoose Schema Lifecycle 'Post' Hooks
        if (value.post) {
            this.post = {
                validate: value.validate,
                save: value.save,
                remove: value.remove,
                updateOne: value.updateOne,
                deleteOne: value.deleteOne,
                find: value.find,
                findOne: value.findOne,
                findOneAndUpdate: value.findOneAndUpdate,
                findOneAndDelete: value.findOneAndDelete,
                findOneAndRemove: value.findOneAndRemove,
                updateMany: value.updateMany,
                deleteMany: value.deleteMany,
            };
        }

        // Frontend Related Fields
        this.fieldType = value.fieldType;
        this.showInTable = value.showInTable;
        this.showInForm = value.showInForm;
        this.fullWidth = value.fullWidth;
        this.sortAsc = value.sortAsc;
        this.sortDesc = value.sortDesc;
        this.filter = value.filter;
    }
}

const createMongooseSchema = (schema) => {
    const mongooseSchema = new mongoose.Schema();

    Object.keys(schema).forEach((key) => {
        const field = schema[key];

        // Skip if it's $schemaName which is a private field
        if (key === "$schemaName" || key === "$apiSlug") return;

        // Add virtual fields
        if (field.getter || field.setter) {
            if (field.getter) mongooseSchema.virtual(key).get(field.getter);
            if (field.setter) mongooseSchema.virtual(key).set(field.setter);
            return;
        }

        // Add pre or post lifecycle hooks
        if (key === "pre" || key === "post") {
            Object.keys(field).forEach((trigger) => mongooseSchema[key](trigger, field[trigger]));
            return;
        }

        // Add custom methods
        if (key === "methods") {
            mongooseSchema[key] = { ...field };
            return;
        }

        // Add field to schema
        let schemaField = { [key]: {} };

        if (typeof field === "object" && !(field instanceof Field))
            Object.keys(field).forEach((fieldKey) => (schemaField[key][fieldKey] = getSchemaField(field[fieldKey])));
        else schemaField = { [key]: getSchemaField(field) };

        mongooseSchema.add(schemaField);
    });

    return mongooseSchema;
};

const getSchemaField = (field) => {
    const fieldType = field.type.$schemaName ? { type: mongoose.Schema.Types.ObjectId, ref: field.type.$schemaName } : { type: field.type };

    const result = { ...fieldType };

    if (field.required && field.required !== null) result.required = [true, `${field.name} is required.`];
    if (field.unique && field.unique !== null) result.unique = field.unique;
    if (field.enum && field.enum !== null) result.enum = field.enum;
    if (field.default && field.default !== null) result.default = field.default;
    if (field.select && field.select !== null) result.select = field.select;
    if (field.validator && field.validator !== null) result.validate = { validator: field.validator, message: field.errorMessage };

    return result;
};

module.exports = { Field, createMongooseSchema };
