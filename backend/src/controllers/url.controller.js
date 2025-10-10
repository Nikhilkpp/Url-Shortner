import { nanoid } from 'nanoid';
import Url from '../models/Url.js';
import { client } from '../configs/redis.js';

export const shortenUrl = async (req, res) => {
try {
      const { originalUrl } = req.body;
      if (!originalUrl) return res.status(400).json({ message: 'URL required' });
    
      const shortId = nanoid(6);
      const newUrl = new Url({ shortId, originalUrl });
      await newUrl.save();
    
      //caching 
      await client.set(shortId,originalUrl,{EX:3600});
    
      res.json({ shortUrl: `${shortId}` });
} catch (error) {
    res.status(500).json({message:'Server error at shortenURL'})
    
}

};

export const redirectUrl = async (req, res) => {
 try {

     const { shortId } = req.params;
   
     console.log('finding the desired url')
     const url = await Url.findOne({ shortId });
     if (!url) return res.status(404).json({ message: 'URL not found' });
     
   
     url.clickCount += 1;
     url.analytics.push({
       ip: req.ip,
       userAgent: req.headers['user-agent']
     });
     await url.save();
   
     //caching 
     await client.set(shortId,url.originalUrl,{EX:3600});
   
     res.status(200).json({originalUrl:url.originalUrl})


 }  catch (error) {
    res.status(500).json({message:'Server error at redirectURL'})
    
}
};

export const getAnalytics = async (req, res) => {
  try {
    const urls = await Url.find();
    res.json(urls);
  }  catch (error) {
    res.status(500).json({message:'Server error at getAnalytics'})
    
}
};
