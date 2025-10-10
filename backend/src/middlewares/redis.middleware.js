import { client } from "../configs/redis.js";

const getCache = async (req, res, next) => {
  const { shortId } = req.params;

  try {
    const url = await client.get(shortId);

    if (url !== null) {
      console.log(`Cache hit for ${shortId}`);
      return res.status(200).json({ originalUrl: url });
    } else {
      // Cache miss
      next();
    }
  } catch (error) {
    console.error("Redis error:", error);
    res.status(500).json({ message: "Server error at getCache" });
  }
};

export default getCache;
