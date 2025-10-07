import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
// import nanoid from 'nanoid';

export const shortenUrl = async (req, res) => {
  const { originalUrl } = req.body;
  if (!originalUrl) return res.status(400).json({ message: 'URL required' });

  const shortId = nanoid(6);
  const newUrl = new Url({ shortId, originalUrl });
  await newUrl.save();
  res.json({ shortUrl: `${shortId}` });
};

export const redirectUrl = async (req, res) => {
  const { shortId } = req.params;
  const url = await Url.findOne({ shortId });
  if (!url) return res.status(404).json({ message: 'URL not found' });

  // Increment click count + add analytics
  url.clickCount += 1;
  url.analytics.push({
    ip: req.ip,
    userAgent: req.headers['user-agent']
  });
  await url.save();
  res.status(200).json({originalUrl:url.originalUrl})
//   res.redirect(url.originalUrl);
};

export const getAnalytics = async (req, res) => {
  const urls = await Url.find();
  res.json(urls);
};
