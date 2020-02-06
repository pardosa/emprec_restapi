const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    address_id: { type: Number },
    contact_name: { type: String },
    contact_number: { type: Number, default: 0 },
    contact_email: { type: String },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String }
    },
    created_at: {type: Date, default: Date.now}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Supplier', schema);