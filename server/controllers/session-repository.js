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

const getDailySessions = async () => {
    try {
        const now = new Date();
        const startDate = new Date(
            Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0,
                0,
                0
            )
        );
        const endDate = new Date(
            Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                23,
                59,
                59
            )
        );
        const faceSessions = await FaceSession.find({
            date: { $gte: startDate, $lte: endDate }
        });
        const bodySessions = await BodySession.find({
            date: { $gte: startDate, $lte: endDate }
        });
        const laserSessions = await LaserSession.find({
            date: { $gte: startDate, $lte: endDate }
        });
        return { result: true, sessions: [...faceSessions, ...bodySessions, ...laserSessions] }
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const getClientSessions = async (clientId) => {
    try {
        const faceSessions = await FaceSession.find({ client: clientId });
        const bodySessions = await BodySession.find({ client: clientId });
        const laserSessions = await LaserSession.find({ client: clientId });
        return { result: true, sessions: [...faceSessions, ...bodySessions, ...laserSessions] }
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const getAllSessions = async () => {
    try {
        const faceSessions = await FaceSession.find({});
        const bodySessions = await BodySession.find({});
        const laserSessions = await LaserSession.find({});
        return { result: true, sessions: [...faceSessions, ...bodySessions, ...laserSessions] }
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const filterSessionsByDate = async (startDate, endDate) => {
    try {
        const now = new Date(startDate);
        const then = new Date(endDate);
        const startDate1 = new Date(
            Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0,
                0,
                0
            )
        );
        const endDate1 = new Date(
            Date.UTC(
                then.getFullYear(),
                then.getMonth(),
                then.getDate(),
                23,
                59,
                59
            )
        );
        const faceSessions = await FaceSession.find({
            date: { $gte: startDate1, $lte: endDate1 }
        });
        const bodySessions = await BodySession.find({
            date: { $gte: startDate1, $lte: endDate1 }
        });
        const laserSessions = await LaserSession.find({
            date: { $gte: startDate1, $lte: endDate1 }
        });
        return { result: true, sessions: [...faceSessions, ...bodySessions, ...laserSessions] }
    } catch (error) {
        return { result: false, message: error.message };
    }
}

module.exports = {
    createBodySession,
    createFaceSession,
    createLaserSession,
    editSession,
    deleteSession,
    getAllSessions,
    getClientSessions,
    getDailySessions,
    filterSessionsByDate
}