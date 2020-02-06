const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    brand: { type: String, required: true },
    category: { type: Number },
    description: { type: String },
    active: { type: Number, default: 0 },
    contact_email: { type: String },
    point: { type: Number, default: 0 },
    created_at: {type: Date, default: Date.now}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Product', schema);