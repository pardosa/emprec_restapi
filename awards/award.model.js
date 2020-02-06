const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userType = new Schema({
    member_id: {type: Number},
    member_type: {type: String},
    member_role: {type: String}
});

const reward = new Schema({
    product_id: {type: Number},
    point: {type: Number},
    amount: {type: Number},
    description: {type: String}
});

const schema = new Schema({
    name: { type: String, unique: true, required: true },
    description: { type: String, required: true },
    active: { type: Number, default: 0 },
    creator_id: { type: Number },
    owners: [userType],
    members: [userType],
    rewards: [reward],
    created_at: {type: Date, default: Date.now}
});

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Award', schema);