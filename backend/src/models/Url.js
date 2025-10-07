import mongoose from 'mongoose';

const UrlSchema = new mongoose.Schema({
  shortId: { 
    type: String, 
    required: true, 
    unique: true 
},
  originalUrl: { 
    type: String, 
    required: true 
},
  clickCount: { 
    type: Number, 
    default: 0 
},
  analytics: [
    {
      timestamp: { 
        type: Date, 
        default: Date.now 
    },
      ip: String,
      userAgent: String
    }
  ]
});

const Url = mongoose.model('Url', UrlSchema);
export default Url;