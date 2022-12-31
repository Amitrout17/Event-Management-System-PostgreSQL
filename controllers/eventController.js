const event = require("../models/eventModel");
const { Op } = require("sequelize");

exports.createEvent = async (req, res) => {
  try {
    const newEvent = await event.create({
      event_name: req.body.eventName,
      host_name: req.user.name,
      event_details: req.body.eventDetails,
      invitee_email: req.body.inviteeEmail,
      host_email: req.user.email,
      event_date: req.body.eventDate,
    });
    res.status(200).json({
      message: "Event created sucessfully",
      event_details: newEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

exports.inviteFriends = async (req, res) => {
  try {
    //Invite user to a perticular event that is created by logged-in user
    const eventDetails = await event.findOne({
      where: {
        host_email: req.user.email,
        event_name: req.body.eventName,
      },
    });

    if (!eventDetails) {
      return res.status(404).json({
        message: "No such event found",
      });
    }

    if (!eventDetails.invitee_email) {
      var tempArr = [];
      tempArr.push(req.body.inv_email);
      eventDetails.invitee_email = tempArr;
      await eventDetails.save();
    } else {
      var tempArr = eventDetails.invitee_email;

      tempArr.push(req.body.inv_email);

      await event.update(
        { invitee_email: tempArr },
        {
          where: {
            host_email: req.user.email,
            event_name: req.body.eventName,
          },
        }
      );
    }

    res.status(200).json({
      message: "Invitation Added Sucessfylly",
      details: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

exports.allEvents = async (req, res) => {
  try {
    const eventDetails = await event.findAll();

    if (!eventDetails) {
      return res.status(404).json({
        message: "No such event found",
      });
    }
    res.status(200).json({
      message: "Event Details Fetch Sucessfully",
      details: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

//Event Details

exports.eventDetails = async (req, res) => {
  try {
    const eventDetails = await event.findOne({
      host_email: req.user.email,
      event_name: req.body.eventName,
    });

    if (!eventDetails) {
      return res.status(404).json({
        message: "No such event found",
      });
    }

    res.status(200).json({
      message: "Event Details Fetch Sucessfully",
      details: eventDetails,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

//Event Update

exports.updateEvent = async (req, res) => {
  try {
    const findEvent = await event.findOne({
      where: {
        host_email: req.user.email,
        event_name: req.params.eventName,
      },
    });

    if (!findEvent) {
      return res.status(404).json({
        message: "No such event found",
      });
    } else {
      const eventDetails = await event.update(req.body, {
        where: {
          host_email: req.user.email,
          event_name: req.params.eventName,
        },
      });
      res.status(200).json({
        message: "Event Updated",
        details: eventDetails,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};

//List of invited Events that the user have been invited to

exports.invitedEvents = async (req, res) => {
  try {

    const page = parseInt(req.query.page) || 1;
    const resultPerPage = parseInt(req.query.resultPerPage) || 1;

    const { eventDate, eventName } = req.query;

    const queryObj = {};
    if (eventDate) {
      queryObj.event_date = eventDate;
    }
    if (eventName) {
      queryObj.event_name = eventName;
    }
    var sortOrder = "ASC";
    if (req.query.sortOrder) {
      sortOrder = req.query.sortOrder;
    }

    const findEvent = await event.findAll({
      where: {
        invitee_email: { [Op.contains]: [req.user.email] },
        ...queryObj,
      },
      order: [
        [`${req.query.sortBy ? req.query.sortBy : "event_name"}`, `${req.query.sortOrder ? req.query.sortOrder : "ASC"}`], 
      ],
       offset: ((page-1)*resultPerPage),
       limit: resultPerPage
    });
    res.status(200).json({
      message: "Event Fetch sucessfully",
      data: findEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
};


//List of created Events

exports.createdEventList=async(req,res)=>{
  try {
    const page = parseInt(req.query.page) || 1;
    const resultPerPage = parseInt(req.query.resultPerPage) || 2;

    const { eventDate, eventName } = req.query;

    const queryObj = {};
    if (eventDate) {
      queryObj.event_date = eventDate;
    }
    if (eventName) {
      queryObj.event_name = eventName;
    }
    var sortOrder = "ASC";
    if (req.query.sortOrder) {
      sortOrder = req.query.sortOrder;
    }

    const findEvent = await event.findAll({
      where: {
        host_email:req.user.email,
        ...queryObj,
      },
      order: [
        [`${req.query.sortBy ? req.query.sortBy : "event_name"}`, `${req.query.sortOrder ? req.query.sortOrder : "ASC"}`], 
      ],
       offset: ((page-1)*resultPerPage),
       limit: resultPerPage
    });

    res.status(200).json({
      message: "Event Fetch sucessfully",
      data: findEvent,
    });
  } catch (error) {
    res.status(500).json({
      message: "Some error occured",
      error_message: error.message,
    });
  }
}