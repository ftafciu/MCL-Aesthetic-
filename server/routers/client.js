require("dotenv").config();
const express = require("express");
const app = express();
const login_controller = require("../controllers/userProxy");
const clientRepo = require('../controllers/client-repository.js');
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(cookieParser());

app.get("/all", (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await clientRepo.getClients();
        if (response.result) {
            res.status(200).json(response.clients);
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.post("/filter", (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await clientRepo.filterClients(req.body.filter);
        if (response.result) {
            res.status(200).json(response.clients);
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.delete("/:clientId", (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await clientRepo.deleteClient(req.params.clientId);
        if (response.result) {
            res.status(200).json({ message: response.message });
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.post("/create", (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await clientRepo.createClient(req.body);
        if (response.result) {
            res.status(200).json({ message: response.message });
        } else {
            res.status(400).json({ message: response.message })
        }
    });
});

app.put("/edit/:clientId", (req, res) => {
    login_controller.authorize(req, res, async () => {
        const response = await clientRepo.editClient(req.params.clientId, req.body.newInfo);
        if (response.result) {
            res.status(200).json({ message: response.message });
        } else {
            res.status(400).json({ message: response.message })
        }
    });
})

module.exports = app;