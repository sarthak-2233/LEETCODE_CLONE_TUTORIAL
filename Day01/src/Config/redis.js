const { createClient } = require('redis');
// redis  
// rate limiter
// DNS change check
const client = createClient({
    username: 'default',
    password: process.env.REDDIS_PASSWORD,
    socket: {
        host: 'redis-12673.c8.us-east-1-3.ec2.cloud.redislabs.com',
        port: 12673
    }
});
// redis needs restart
client.on('error', err => console.log('Redis Client Error', err));
module.exports= client;