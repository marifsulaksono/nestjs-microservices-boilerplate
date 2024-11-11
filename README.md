# NestJS

Description project


## Installation
**node** : 20 <br >
**nest cli** : 10.4.7<br >

Sebelum menjalankan projek ini pastikan kita telah menginstall:
- nestcli: untuk menjalankan aplikasi nestjs <br >`npm i -g @nestjs/cli`
- pm2: Untuk mengelola proses aplikasi secara bersamaan <br > `npm i -g pm2`

Berikut tahap untuk setup projek :
- Clone this repository
```
  git clone https://gitlab.com/venturo-web/venturo-nest-microservice-boilerplate.git
```
- Masuk ke direktori projek
```
cd venturo-nest-microservice-boilerplate
```
- Instal dependency laravel menggunakan perintah
```
npm install
```
- Copy `.env.example` menjadi `.env` dengan perintah
```
cp .env.example .env
```
- Konfigurasi Database
Sesuaikan konfigurasi database pada file `.env`
```
APP_NAME=space
APP_GATEWAY_PORT=3000
APP_USER_PORT=3001
APP_ROLE_PORT=3002

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=core_nestjs_venturo
DB_USERNAME=root
DB_PASSWORD=

JWT_SECRET=
```
- Migration
Cara membuat file migrasi baru:
```
npm run migration:create --name=<your migration name>
```

Cara menjalankan file migrasi:
```
npm run migrate
```

Cara mengembalikan proses migrasi (1 step):
```
npm run migration:down
```

- Membuat service baru
Untuk membuat app baru, gunakan perintah:
```
nest generate app <app name>
```

Lalu untuk membuat gateway baru, gunakan perintah:
```
nest generate module <app name> --project api-gateway
nest generate service <app name> --project api-gateway
nest generate controller <app name> --project api-gateway
```


- Menjalankan projek laravel
development / local:
```
npm run start
```
staging / production:
```
npm run build
```

atau kita juga dapat menjalankan app secara manual:
```
nest start <apps name> --watch
```


## Struktur Folder 
Nest JS

- nest generate app api-gateway -> membuat aplikasi baru
- npm install @nestjs/microservices -> install library micro service nests
- nest generate module products --project api-gateway -> membuat module roles di folder api-gateway
- nest generate service roles --project api-gateway -> membuat service roles di folder api-gateway
- nest generate controller auth --project api-gateway -> membuat controller roles di folder api-gateway
- nest generate resources roles --project api-gateway -> membuat keseluruhan (module, service, controller) roles di folder api-gateway
- 


```
.
├── apps
│   ├── api-gateway : Menyimpan file kode API gateway
│      ├── src : Menyimpan file kode internal API gateway
│         ├── auth : Menyimpan module gateway API auth
│         ├── middleware : Menyimpan semua middleware (Hanya lead programmer yang boleh menambahkan middleware)
│         ├── roles : Menyimpan module gateway API roles
│         ├── users : Menyimpan module gateway API users
│         ├── api-gateway.module.ts : Menyimpan konfigurasi module API gateway
│         ├── main.ts : Entry point untuk API gateway aplikasi
│      ├── test : Menyimpan file testing untuk gateway
│      ├── tsconfig.app.json : Menyimpan konfigurasi typescript pada API gateway
│   ├── roles : Menyimpan semua module service roles
│      ├── src : Menyimpan file kode internal service roles
│   ├── users : Menyimpan semua module service users
│      ├── src : Menyimpan file kode internal service users
├── database : Directory untuk menyimpan Database Migration & Seeder Script
├── shared : Directory untuk menyimpan semua helper yang dapat digunakan pada semua module
├── config : Directory untuk menyimpan semua konfigurasi
├── database : Directory untuk menyimpan Database Migration Script
├── .env : File environment untuk menyimpan konfigurasi pada masing-masing device development (Jangan dipush ke repository)
├── .env.example : File environment yang digunakan sebagai template .env (Wajib di push ke repository dan nama variabel harus di update menyesuaikan perubahan pada file .env) agar semua tim bisa mengetahui konfigurasi apa saja yang dibutuhkan.
├── .gitignore : File untuk mendaftarkan folder / file apa saja yang tidak push ke repository
└── build-local.js : File untuk menyimpan fungsi helper untuk melakukan build aplikasi secara lokal dan melakukan start
└── build.js : File untuk menyimpan fungsi helper untuk melakukan build aplikasi
└── ecosystem.config.js : File untuk menyimpan fungsi helper untuk membuat ekosistem untuk menjalakan aplikasi
└── tsconfig.json : File untuk menyimpan konfigurasi kode typescrypt secara umum
```
