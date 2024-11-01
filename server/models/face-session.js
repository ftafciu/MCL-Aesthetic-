const mongoose = require('mongoose');

const faceSessionSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    date: { type: Date, required: true },
    treatment: {
        type: String,
        enum: ['cleaning', 'mesotherapy', 'dermopen', 'fillers', 'botox'],
        required: true
    }
});

const faceSession = mongoose.model("FaceSession", faceSessionSchema);

module.exports = faceSession;