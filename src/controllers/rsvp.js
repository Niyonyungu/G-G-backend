import RSVP from "../models/rsvp.js";

const getRSVPs = async (req, res) => {
    try {
        const rsvps = await RSVP.find({}).sort({ createdAt: -1 });
        return res.status(201).json({
            status: 201,
            message: 'rsvps retrieved sucesfully ',
            rsvps: rsvps
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "error occured",
            error
        })
    }
};

const createRSVP = async (req, res) => {
    try {
        const { name, email, phone, event, numberOfGuests, message } = req.body;

        // Input validation
        if (!name || !email || !event) {
            return res.status(400).json({
                status: 400,
                message: "Name, email, and event are required fields",
            });
        }

        // Optional: Check for existing RSVP
        const existingRSVP = await RSVP.findOne({ email, event });
        if (existingRSVP) {
            return res.status(409).json({
                status: 409,
                message: "An RSVP with this email already exists for the event",
            });
        }

        const rsvp = await RSVP.create({
            name,
            email,
            phone,
            event,
            numberOfGuests,
            message,
        });

        return res.status(201).json({
            status: 201,
            message: 'RSVP created successfully',
            rsvp: rsvp
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server error occurred",
        });
    }
};

const updateRSVP = async (req, res) => {
  
    try {
        const { id } = req.params;

        const { name, email, phone, event, numberOfGuests, message } = req.body;
        const updatedRSVP = await RSVP.findByIdAndUpdate(
            id,
            { name, email, phone, event, numberOfGuests, message },
            { new: true }
        );

        if (!updatedRSVP) {
            return res.status(404).json({
                status: 404,
                message: "RSVP not found"
            });
        }

        return res.status(200).json({
            status: 200,
            message: 'RSVP updated successfully',
            rsvp: updatedRSVP
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "Server error occurred",
            error
        });
    }
};

const deleteRSVP = async (req, res) => {
    try {

        const { id } = req.params;
        const rsvp = await RSVP.findById(id);

        if (!rsvp) {
            res.status(404).json({ message: 'RSVP not found' });
            return;
        }

        await rsvp.deleteOne();
        return res.status(201).json({
            status: 201,
            message: 'Rsvp deleted sucesfully ',
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: 500,
            message: "error occured",
            error
        })
    }
};

export { getRSVPs, createRSVP, updateRSVP , deleteRSVP };