require("dotenv").config();
const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const notificationRepo = require('../controllers/notification-repository.js');
const sessionRepo = require("../controllers/session-repository.js");
const login_controller = require('../controllers/userProxy.js');

app.use(cookieParser());
app.use(bodyParser.json());

app.get("/daily-sessions", (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.getDailySessions();
        if (response.result) {
            res.status(200).json(response.sessions);
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.get('/client-sessions/:clientId', (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.getClientSessions(req.params.clientId);
        if (response.result) {
            res.status(200).json(response.sessions);
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.get('/all-sessions', (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.getAllSessions();
        if (response.result) {
            res.status(200).json(response.sessions);
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.post('/finished-sessions', (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.getFinishedSessions(req.body.startDate, req.body.endDate);
        if (response.result) {
            res.status(200).json(response.sessions);
        } else {
            res.status(400).json({ message: response.message })
        }
    });
})

app.post('/filter-by-date', (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.filterSessionsByDate(req.body.firstDate, req.body.lastDate);
        if (response.result) {
            res.status(200).json(response.sessions);
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.post('/create', (req, res) => {
    login_controller.authorize(req, res, async () => {
        let response = null;
        if (req.body.sessionType === 'face') {
            response = await sessionRepo.createFaceSession(req.body.sessionInfo);
        } else if (req.body.sessionType === 'body') {
            response = await sessionRepo.createBodySession(req.body.sessionInfo);
        } else {
            response = await sessionRepo.createLaserSession(req.body.sessionInfo);
        }
        if (response?.result) {
            res.status(200).json({ message: response?.message });
        } else {
            res.status(400).json({ message: response?.message });
        }
    });
});

app.post('/create-by-notification', (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.createSessionFromNotification(
            req.body.notificationId,
            req.body.sessionType,
            req.body.sessionInfo
        );
        if (response?.result) {
            res.status(200).json({ message: response?.message });
        } else {
            res.status(400).json({ message: response?.message });
        }
    });
});

app.put('/finish-session', (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.finishSession(
            req.body.sessionId,
            req.body.price,
            req.body.comments,
            [],
            req.body.last
        )
        if (response?.result) {
            res.status(200).json({ message: response?.message });
        } else {
            res.status(400).json({ message: response?.message });
        }
    });
})

app.put('/edit/:sessionId', (req, res) => {

});

app.delete('/delete/:sessionId', (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await sessionRepo.deleteSession(req.params.sessionId, req.body.sessionType);
        if (response.result) {
            res.status(200).json({ message: response.message });
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

module.exports = app;