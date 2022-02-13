import { Router } from 'express';

import items from './items/index.js'

const router = new Router();

router.use('/items', items);

export default router;