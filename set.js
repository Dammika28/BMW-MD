const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicU5rcGxhdEhXL1lDNHA5U0plVHI5QUs1akx2Z0VKYUNkTTVibEZ0ckYyND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVW9LYWJsMzd5SWtXZUFPTW1LUWxBcFp2U2NYV256Umg5cHREa1BQMFZ6cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJZQjFybTFIbHQyajU4TGhJUW5abjdUOWY0S3pXM0s0NXhjWDNOUWFudTE0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJVG9JYlhGdU1sWUhXMFZHUkxlM1RmOW9yRGtGYlJjYUFvNVFiUFFxQm5JPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjZIOTRiU0kySGZmTEo5SzBsYXN5Qm5lQVkyOWFDMHdURG4ra0FsYmVRR1U9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Imp0b3ZHMHd5RGZGWHhuU0RFY0ZrRjJTTUhEd2swQ0VvTmFyNm02UEFUZ0E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0NZeTNMVDZtVGtJSmRVRlZWTE5qYmZldmlUaDNIYk9RdW9KTDhUUkxXTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS1NWVC9KVUY3Qi9FUTMrR2o2U2FVajBSbkFhVHJGTjdUYVdsRzBxZVJCaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjQ3bUNneWoxdFYzNjRKNXViZEhkY24rSXNWei9GL01naWVaMFIzWnVhc1JheVJBMFVmRkU5UVRnd0FLZVZrK29xRWxMS0l4VU5ZaWU2dE83bWl4WWlBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6NDEsImFkdlNlY3JldEtleSI6ImxHenZ2eUhGQ0c1cjlBYzUybGdRVGJNbk5jTHVCNGo3RWQ2NHN3Y0VZNFk9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlREMU50LU9GUk4ySF96b1dBUUtaNVEiLCJwaG9uZUlkIjoiZGM2Mzk0OTYtNGYxMS00MTg5LWFiODUtNjI0NjRkODk5ZmFjIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRQRTdEOXU5WisyNzNOM2VNZEFWaVFPL0VDdz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI2T1Z5ZW5aMXBsYVp6akhHb2ZiT2gyMWZaK2M9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiRVhQNkoyQU0iLCJtZSI6eyJpZCI6Ijk0NzE3NTE1NTg3OjYzQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuqngSAgICAgICAgICDwnZOX8J2TkPCdk5rwnZOU8J2ToSAgICAgICAgIOqngiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSlBmazdnREVOUGo3TFVHR0FjZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoibTkxckVwdksvSm5tdUpQaGhWVUlNQlF4blZRY1ZnZk1xeTFadS9MbVlBUT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiSjBhRWxPWDJOR0tNWmlnTHV5bW9vSDMyK0NDK1Q5U2VBVDRxZEZ4NEliSHdUVFpTL0dJK1BEUlNBUmZRVDJJRGhuMVJUeHNJU1pzMFdEeW9FcEFkQmc9PSIsImRldmljZVNpZ25hdHVyZSI6Ilo4ek0yY2IweUNJQ3lTUUtIMHRZQm8vWFQxOVNpd1RPaWk1bFhjZmV1cmxUQ2JzUGNxK2svZVZNdXVLZnFvK0VadlNWZWZmM0tiTUJCL29SRWRtM2pRPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3MTc1MTU1ODc6NjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWnZkYXhLYnl2eVo1cmlUNFlWVkNEQVVNWjFVSEZZSHpLc3RXYnZ5NW1BRSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyMzU0NDAzMSwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFNZGYifQ==,
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Hacker",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "Hacker",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'Hacker_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
