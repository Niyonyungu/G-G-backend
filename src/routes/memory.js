import express from 'express';
import { getMemories, createMemory, deleteMemory } from '../controllers/memory.js';
import isAuthorized from '../middleware/auth.js';

const memoryRoutes = express.Router();

memoryRoutes.post('/', createMemory);
memoryRoutes.delete('/:id', isAuthorized, deleteMemory);
memoryRoutes.get('/', getMemories);


export default memoryRoutes;