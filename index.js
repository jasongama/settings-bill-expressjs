const express = require("express");
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const SettingsBill = require("./settings-billLogic");
var moment = require('moment');
moment().format();
const app = express();

const settingsBill = SettingsBill();
const handlebarsSetup = exphbs({
    partialsDir: "./views/partials",
    viewPath: "./views",
    layoutsDir: "./views/layouts"
});
app.engine('handlebars', handlebarsSetup);
app.set("view engine", "Handlebars")
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json())

app.use(express.static("public"))

app.set('view engine', 'handlebars');

app.get("/", function (req, res) {
    res.render("index", {
        settings: settingsBill.getSettings(),
        totals: settingsBill.totals(),
        levels: settingsBill.hasReachedWarningLevel()

    })
});

app.post("/settings", function (req, res) {

    settingsBill.setSettings({
        callCost: req.body.callCost,
        smsCost: req.body.smsCost,
        warningLevel: req.body.warningLevel,
        criticalLevel: req.body.criticalLevel

    })


    res.redirect("/");

});

app.post("/action", function (req, res) {

    settingsBill.recordAction(req.body.actionType)

    res.redirect("/");
});

app.get("/actions", function (req, res) {
    var time = settingsBill.actions()
    for (const iterator of time) {
        iterator.ago = moment(iterator.timestamp).fromNow()
    }
    res.render("actions", {
        actions: time
    });
});

app.get("/actions/:actiontype", function (req, res) {
    const actiontype = req.params.actiontype;
    var time = settingsBill.actionsFor(actiontype)
    for (const iterator of time) {
        iterator.ago = moment(iterator.timestamp).fromNow()
    }
    res.render("actions", {
        actions: time
    });
});

let PORT = process.env.PORT || 5000;


app.listen(PORT, function () {
    console.log("Setting", PORT)
});