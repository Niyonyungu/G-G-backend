import express from 'express';
import { getRSVPs, createRSVP, updateRSVP , deleteRSVP } from '../controllers/rsvp.js'
import isAuthorized from '../middleware/auth.js';

const rsvpRoutes = express.Router();

rsvpRoutes.post('/', createRSVP);
rsvpRoutes.put('/:id', updateRSVP);
rsvpRoutes.delete('/:id', isAuthorized , deleteRSVP);
rsvpRoutes.get('/', getRSVPs);

export default rsvpRoutes;