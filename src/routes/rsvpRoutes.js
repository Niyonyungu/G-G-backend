import express from 'express';
import { getRSVPs, createRSVP, deleteRSVP } from '../controllers/rsvp.js'
import isAuthorized from '../middleware/auth.js';

const rsvpRoutes = express.Router();

rsvpRoutes.post('/', isAuthorized, createRSVP);
rsvpRoutes.delete('/:id', isAuthorized,  deleteRSVP);
rsvpRoutes.get('/', isAuthorized, getRSVPs);

export default rsvpRoutes;