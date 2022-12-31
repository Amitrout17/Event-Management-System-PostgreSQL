const express = require("express");
const { route } = require("../app");
const {
  createEvent,
  inviteFriends,
  allEvents,
  eventDetails,
  updateEvent,
  invitedEvents,
  createdEventList,
} = require("../controllers/eventController");
const isAuthenticated = require("../middlewares/isAuth");

const router = express.Router();
router.route("/createEvent").post(isAuthenticated, createEvent);
router.route("/event/invite").post(isAuthenticated, inviteFriends);
router.route("/event/all").get(isAuthenticated, allEvents);
router.route("/event/details").get(isAuthenticated, eventDetails);
router.route("/event/update/:eventName").post(isAuthenticated, updateEvent);
router.route("/event/invited").get(isAuthenticated, invitedEvents);
router.route("/event/created/list").get(isAuthenticated,createdEventList)

module.exports = router;
