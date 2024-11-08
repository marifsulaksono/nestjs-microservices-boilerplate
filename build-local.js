const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Dapatkan nama folder di dalam 'apps'
const appsDir = path.join(__dirname, 'apps');
const services = fs.readdirSync(appsDir).filter((file) => fs.statSync(path.join(appsDir, file)).isDirectory());

// Fungsi untuk menjalankan perintah secara asinkron
const startService = (service) => {
  return new Promise((resolve, reject) => {
    const command = `nest start ${service} --watch`;
    console.log(`Starting ${service}...`);
    const process = exec(command);

    process.stdout.on('data', (data) => {
      console.log(`${service}: ${data}`);
    });

    process.stderr.on('data', (data) => {
      console.error(`${service} error: ${data}`);
    });

    process.on('close', (code) => {
      if (code === 0) {
        resolve(`${service} started successfully`);
      } else {
        reject(`${service} failed to start`);
      }
    });
  });
};

// Jalankan semua aplikasi secara paralel
const startAllServices = async () => {
  try {
    const results = await Promise.all(services.map(startService));
    console.log(results);
    console.log('All services are running');
  } catch (error) {
    console.error('Some services failed to start');
  }
};

startAllServices();
