import express from "express";
import {
    getAnnouncements,
    getSingleAnnouncement,
    createAnnouncement,
    updateAnnouncement,
    toggleActiveStatus,
    deleteAnnouncement
} from "../controllers/announcement.js";

import isAuthorized from "../middleware/auth.js";

const announcementRoutes = express.Router();

announcementRoutes.post('/', createAnnouncement)
announcementRoutes.get('/', getAnnouncements)
announcementRoutes.get('/:id', getSingleAnnouncement)
announcementRoutes.put('/:id', updateAnnouncement)
announcementRoutes.patch('/:id/toggle-status', toggleActiveStatus)
announcementRoutes.delete('/:id', isAuthorized, deleteAnnouncement)

export default announcementRoutes;

