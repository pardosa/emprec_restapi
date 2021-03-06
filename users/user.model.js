const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    name: { type: String, required: true },
    hash: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    is_activated: { type: Number, default: 0 },
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String }
    },
    created_at: {type: Date, default: Date.now}

});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', schema);