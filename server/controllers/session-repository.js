const FaceSession = require('../models/face-session');
const LaserSession = require("../models/laser-session");
const BodySession = require('../models/body-session');

const createBodySession = async (sessionInfo) => {
    try {
        const newSession = new BodySession({ ...sessionInfo });
        await newSession.save();
        return { result: true, message: "Session created successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const createFaceSession = async (sessionInfo) => {
    try {
        const newSession = new FaceSession({ ...sessionInfo });
        await newSession.save();
        return { result: true, message: "Session created successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const createLaserSession = async (sessionInfo) => {
    try {
        const newSession = new LaserSession({ ...sessionInfo });
        await newSession.save();
        return { result: true, message: "Session created successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const editSession = async () => {

};

const deleteSession = async (sessionId, sessionType) => {
    try {
        let session = null;
        if (sessionType === 'face') {
            session = await FaceSession.findById(sessionId);
        } else if (sessionType === 'body') {
            session = await BodySession.findById(sessionId);
        } else {
            session = await LaserSession.findById(sessionId);
        }
        if (!session) {
            throw new Error("Session does not exist!");
        }
        await session.deleteOne();
        return { result: true, message: "Session deleted successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

module.exports = {
    createBodySession,
    createFaceSession,
    createLaserSession,
    editSession,
    deleteSession
}