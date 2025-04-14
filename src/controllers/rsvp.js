import RSVP from "../models/rsvp.js";


const getRSVPs = async (req, res) => {
    try {
        const rsvps = await RSVP.find({}).sort({ createdAt: -1 });
        res.json(rsvps);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const createRSVP = async (req, res) => {
    try {
        const { name, email, phone, event, numberOfGuests, message } = req.body;
        const rsvp = await RSVP.create({
            name,
            email,
            phone,
            event,
            numberOfGuests,
            message,
        });

        res.status(201).json(rsvp);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};


const deleteRSVP = async (req, res) => {
    try {
        const rsvp = await RSVP.findById(req.params.id);

        if (!rsvp) {
            res.status(404).json({ message: 'RSVP not found' });
            return;
        }

        await rsvp.deleteOne();
        res.json({ message: 'RSVP removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

export { getRSVPs, createRSVP, deleteRSVP };