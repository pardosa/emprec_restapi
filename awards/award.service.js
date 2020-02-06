const config = require('config.json');
const db = require('_helpers/db');
const Award = db.Award;

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function getAll() {
    return await Award.find().select('-name');
}

async function getById(id) {
    return Award.findById(id).select('-name');
}

async function create(awardParam) {
    // validate
    if (await Award.findOne({ name: awardParam.name })) {
        throw 'Award name "' + awardParam.name + '" is already used';
    }

    const award = new Award(awardParam);
    console.log(award);

    // save award
    await award.save();
}

async function update(id, awardParam) {
    const award = await Award.findById(id);

    // validate
    if (!award) throw 'Award not found';
    if (award.name !== awardParam.name && await Award.findOne({ name: awardParam.name })) {
        throw 'Name "' + awardParam.name + '" is already taken';
    }

    // copy userParam properties to user
    Object.assign(award, awardParam);

    await award.save();
}

async function _delete(id) {
    await Award.findByIdAndRemove(id);
}