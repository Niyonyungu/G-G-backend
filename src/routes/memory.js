import express from 'express';
import { getMemories, createMemory, deleteMemory, getMemory , updateMemory } from '../controllers/memory.js';
import { upload } from '../config/cloudinaryConfig.js';
import isAuthorized from '../middleware/auth.js';

const memoryRoutes = express.Router();

memoryRoutes.post('/', upload.single('media'), createMemory);
memoryRoutes.put('/:id', upload.single('media'), updateMemory);
memoryRoutes.delete('/:id', isAuthorized, deleteMemory);
memoryRoutes.get('/', getMemories);
memoryRoutes.get('/', getMemory);


export default memoryRoutes;