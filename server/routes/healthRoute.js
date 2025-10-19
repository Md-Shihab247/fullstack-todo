const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const cloudinary = require("../config/cloudinaryConfig");
const Queue = require('bull');

router.get("/health", async (req, res) => {
  const health = {
    status: "ok",
    timeStamp: new Date(),
    uptime: process.uptime(),
    services: {
      mongodb: `unknown`,
      redis: `unknown`,
      cloudinary: `unknown`,
    },
  };

    try {
      let DBstate = mongoose.connection.readyState;
      health.services.mongodb = DBstate === 1 ? `connected` : `disconnected`;
    } catch (error) {
      health.services.mongodb = error;
    }

    try {
      health.services.cloudinary = cloudinary.config().cloud_name ? `connected` : `disconnected`;
    } catch (error) {
      health.services.cloudinary = error;
    }
    try {
      const testQueue = new Queue('health-check', {
        redis: {
          host: process.env.REDIS_HOST,
          port: process.env.REDIS_PORT,
          username: process.env.REDIS_USERNAME,
          password: process.env.REDIS_PASSWORD
        }
      });
      const isReady = await testQueue.isReady();
      health.services.redis = isReady ? 'connected' : 'disconnected';
      testQueue.close();
    } catch (error) {
      health.services.redis = 'disconnected';
    }
    res.send(health);
});

module.exports = router;
