import express from 'express';
const router = express.Router();
import { shortenUrl, redirectUrl, getAnalytics } from '../controllers/url.controller.js';
import getCache from '../middlewares/redis.middleware.js';

router.post('/shorten', shortenUrl);
router.get('/:shortId', getCache,redirectUrl);
router.get('/analytics/all', getAnalytics);

export default router;