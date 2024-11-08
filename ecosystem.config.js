const fs = require('fs');
const path = require('path');
const { config } = require('dotenv');
config();

// Dapatkan nama folder di dalam 'apps'
const appsDir = path.join(__dirname, 'apps');
const services = fs.readdirSync(appsDir).filter((file) => fs.statSync(path.join(appsDir, file)).isDirectory());

// Buat konfigurasi untuk PM2 berdasarkan nama-nama aplikasi
const pm2Config = {
    apps: services.map(service => ({
        name: process.env.APP_NAME + "-" + service,
        script: "node",
        args: path.join(__dirname, `dist/apps/${service}/main.js`), // Menyesuaikan dengan lokasi file setelah build
    })),
};

// Export konfigurasi PM2
module.exports = pm2Config;
