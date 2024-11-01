const mongoose = require('mongoose');

const bodySessionSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    date: { type: Date, required: true }
});

const bodySession = mongoose.model("BodySession", bodySessionSchema);

module.exports = bodySession;