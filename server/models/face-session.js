const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema({
    cleaning: { type: Boolean, required: true, default: false },
    botox: { type: Boolean, required: true, default: false },
    mesotherapy: { type: Boolean, required: true, default: false },
    dermopen: { type: Boolean, required: true, default: false },
    fillers: { type: Boolean, required: true, default: false }
})

const faceSessionSchema = new mongoose.Schema({
    client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true },
    date: { type: Date, required: true },
    treatment: {
        type: treatmentSchema,
        required: true
    },
    type: { type: String, required: true, default: "Face treatment" }
});

const faceSession = mongoose.model("FaceSession", faceSessionSchema);

module.exports = faceSession;