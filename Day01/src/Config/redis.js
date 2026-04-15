const { createClient } = require('redis');
// redis  
// rate limiter
// DNS change check
const client = createClient({
    username: 'default',
    password: process.env.REDDIS_PASSWORD,
    socket: {
        host: 'redis-10062.crce283.ap-south-1-2.ec2.cloud.redislabs.com',
        port: 10062
    }
});
// redis needs restart
client.on('error', err => console.log('Redis Client Error', err));
module.exports= client;