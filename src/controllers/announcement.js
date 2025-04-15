import Announcements from "../models/announcements.js";

// Get all announcements
const getAnnouncements = async (req, res) => {
    try {
        // Find all announcements and sort by newest first
        const announcements = await Announcements.find()
            .sort({ createdAt: -1 })
            .exec();
        return res.status(200).json({
            status: 200,
            message: 'announcements retrieved sucesfully ',
            announcementsData: announcements
        })
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({
            status: 500,
            message: 'Failed to fetch announcements',
            error: error.message
        });
    }
};

// Get a single announcement by ID
const getSingleAnnouncement = async (req, res) => {
    try {
        const { id } = req.params.id
        const announcement = await Announcements.findById(id);

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        return res.status(200).json({
            status: 200,
            message: 'announcement retrieved sucesfully ',
            announcement: announcement
        })
    } catch (error) {
        console.error('Error fetching announcement:', error);
        res.status(500).json({
            status: 500,
            message: 'Failed to fetch announcement',
            error: error.message
        });
    }
};

// Create a new announcement
const createAnnouncement = async (req, res) => {
    try {
        const { title, message, isActive } = req.body;

        // Validate required fields
        if (!title || !message) {
            return res.status(400).json({ message: 'Title and message are required' });
        }

        const announcement = await Announcements.create({
            title,
            message,
            isActive: isActive !== undefined ? isActive : true,
        });

        return res.status(201).json({
            status: 201,
            message: 'announcement Created sucesfully ',
            announcement: announcement
        })

    } catch (error) {
        console.error('Error creating announcement:', error);
        res.status(500).json({
            message: 'Failed to create announcement',
            error: error.message
        });
    }
};

// Update an announcement
const updateAnnouncement = async (req, res) => {
    try {
        const { title, message, isActive } = req.body;
        const announcementId = req.params.id;

        // Find the announcement first to check if it exists
        const announcement = await Announcements.findById(announcementId);

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Update the announcement with new values
        const updatedAnnouncement = await Announcements.findByIdAndUpdate(
            announcementId,
            {
                title: title || announcement.title,
                message: message || announcement.message,
                isActive: isActive !== undefined ? isActive : announcement.isActive,
            },
            { new: true }
        );

        return res.status(200).json({
            status: 200,
            message: 'Announcement Updated sucesfully ',
            updatedAnnouncement: updatedAnnouncement
        })
    } catch (error) {
        console.error('Error updating announcement:', error);
        res.status(500).json({
            status: 500,
            message: 'Failed to update announcement',
            error: error.message
        });
    }
};

// Toggle active status
const toggleActiveStatus = async (req, res) => {
    try {
        const announcementId = req.params.id;

        // Find the announcement first
        const announcement = await Announcements.findById(announcementId);

        if (!announcement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        // Toggle the isActive status
        announcement.isActive = !announcement.isActive;
        await announcement.save();
        res.status(200).json(announcement);
    } catch (error) {
        console.error('Error toggling announcement status:', error);
        res.status(500).json({
            message: 'Failed to toggle announcement status',
            error: error.message
        });
    }
};

// Delete an announcement
const deleteAnnouncement = async (req, res) => {
    try {
        const announcementId = req.params.id;

        // Find and delete the announcement
        const deletedAnnouncement = await Announcements.findByIdAndDelete(announcementId);

        if (!deletedAnnouncement) {
            return res.status(404).json({ message: 'Announcement not found' });
        }

        return res.status(200).json({
            status: 200,
            message: 'Announcement deleted sucesfully ',
            id: announcementId
        })
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({
            message: 'Failed to delete announcement',
            error: error.message
        });
    }
};

export { getAnnouncements, getSingleAnnouncement , createAnnouncement, updateAnnouncement, toggleActiveStatus, deleteAnnouncement };