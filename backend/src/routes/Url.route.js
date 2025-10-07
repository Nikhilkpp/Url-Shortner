import express from 'express';
const router = express.Router();
import { shortenUrl, redirectUrl, getAnalytics } from '../controllers/url.controller.js';

router.post('/shorten', shortenUrl);
router.get('/:shortId', redirectUrl);
router.get('/analytics/all', getAnalytics);

export default router;