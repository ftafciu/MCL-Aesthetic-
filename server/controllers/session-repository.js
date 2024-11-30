const FaceSession = require('../models/face-session');
const LaserSession = require("../models/laser-session");
const BodySession = require('../models/body-session');
const Session = require('../models/session.js');
const notificationRepo = require("./notification-repository.js");

const createBodySession = async (sessionInfo) => {
    try {
        const now = new Date(sessionInfo.date)
        const newSession = new BodySession({
            ...sessionInfo, date: new Date(Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0,
                0,
                0
            ))
        });
        await newSession.save();
        return { result: true, message: "Session created successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const createFaceSession = async (sessionInfo) => {
    try {
        const now = new Date(sessionInfo.date)
        const newSession = new FaceSession({
            ...sessionInfo,
            date: new Date(Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0,
                0,
                0
            ))
        });
        await newSession.save();
        return { result: true, message: "Session created successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const createLaserSession = async (sessionInfo) => {
    try {
        const now = new Date(sessionInfo.date)
        const newSession = new LaserSession({
            ...sessionInfo,
            date: new Date(Date.UTC(
                now.getFullYear(),
                now.getMonth(),
                now.getDate(),
                0,
                0,
                0
            ))
        });
        await newSession.save();
        return { result: true, message: "Session created successfully!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const createSessionFromNotification = async (notificationId, sessionType, sessionInfo) => {
    try {
        let result = null;
        if (sessionType === 'body') {
            result = await createBodySession(sessionInfo);
        } else if (sessionType === 'face') {
            result = await createFaceSession(sessionInfo);
        } else {
            result = await createLaserSession(sessionInfo);
        }
        if (!result?.result) {
            throw new Error("Session could not be created!");
        }
        await notificationRepo.changeNotificationStatus(notificationId);
        return { result: true, message: "Session created successfully!" };
    } catch (error) {
        return { result: false, message: "Could not create the session!" };
    }
}

const editSession = async () => {

};

const deleteSession = async (sessionId, sessionType) => {
    try {
        let session = null;
        if (sessionType === 'face') {
            session = await FaceSession.findById(sessionId).populate('client');
        } else if (sessionType === 'body') {
            session = await BodySession.findById(sessionId).populate('client');
        } else {
            session = await LaserSession.findById(sessionId).populate('client');
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
        }).populate('client');
        const bodySessions = await BodySession.find({
            date: { $gte: startDate, $lte: endDate }
        }).populate('client');
        const laserSessions = await LaserSession.find({
            date: { $gte: startDate, $lte: endDate }
        }).populate('client');
        return { result: true, sessions: [...faceSessions, ...bodySessions, ...laserSessions] }
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const getClientSessions = async (clientId) => {
    try {
        const faceSessions = await FaceSession.find({ client: clientId }).populate('client');
        const bodySessions = await BodySession.find({ client: clientId }).populate('client');
        const laserSessions = await LaserSession.find({ client: clientId }).populate('client');
        return { result: true, sessions: [...faceSessions, ...bodySessions, ...laserSessions] }
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const getAllSessions = async () => {
    try {
        const faceSessions = await FaceSession.find({}).populate('client');
        const bodySessions = await BodySession.find({}).populate('client');
        const laserSessions = await LaserSession.find({}).populate('client');
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
        }).populate('client');
        const bodySessions = await BodySession.find({
            date: { $gte: startDate1, $lte: endDate1 }
        }).populate('client');
        const laserSessions = await LaserSession.find({
            date: { $gte: startDate1, $lte: endDate1 }
        }).populate('client');
        return { result: true, sessions: [...faceSessions, ...bodySessions, ...laserSessions] }
    } catch (error) {
        return { result: false, message: error.message };
    }
}

const findSession = async (sessionId) => {
    try {
        const faceSession = await FaceSession.findById(sessionId).populate('client');
        const bodySession = await BodySession.findById(sessionId).populate('client');
        const laserSession = await LaserSession.findById(sessionId).populate('client');
        return faceSession || bodySession || laserSession;
    } catch (error) {
        return null;
    }
}

const finishSession = async (sessionId, sessionPrice, comments, pictures, last) => {
    try {
        const session = await findSession(sessionId);
        const newSession = new Session({
            client: session.client,
            date: session.date,
            comment: comments,
            pictures: pictures,
            price: sessionPrice,
            type: session.type
        });
        await newSession.save();
        if (!last) {
            await notificationRepo.createNotification({
                client: session.client,
                nextSessionDate: new Date(Date.UTC(session.date.getFullYear(), session.date.getMonth(), session.date.getDate() + 30))
            })
        }
        await deleteSession(sessionId, session.type);
        return { result: true, message: "Session was ended!" };
    } catch (error) {
        return { result: false, message: error.message };
    }
};

const getFinishedSessions = async (startDate, endDate) => {
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
        const finishedSessions = await Session.find({ date: { $gte: startDate1, $lte: endDate1 } }).populate('client');
        return { result: true, sessions: finishedSessions }
    } catch (error) {
        return { result: false, message: error.message };
    }
}

module.exports = {
    createBodySession,
    createFaceSession,
    createLaserSession,
    createSessionFromNotification,
    editSession,
    deleteSession,
    getAllSessions,
    getClientSessions,
    getDailySessions,
    getFinishedSessions,
    filterSessionsByDate,
    finishSession
}