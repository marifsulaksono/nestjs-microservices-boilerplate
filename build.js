const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Dapatkan nama folder di dalam 'apps'
const appsDir = path.join(__dirname, 'apps');
const services = fs.readdirSync(appsDir).filter((file) => fs.statSync(path.join(appsDir, file)).isDirectory());

services.forEach(service => {
  execSync(`nest build ${service}`, { stdio: 'inherit' });
});