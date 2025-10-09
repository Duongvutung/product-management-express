const mongoose = require('mongoose');
require('dotenv').config();  // Load file .env

module.exports.connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Connect to database successfully');
    } catch (error) {
        console.error('❌ Connect to database failed', error);
    }
};
