const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUVtbG1IQXlqcDlZQVJySUgxSWo1dWxYcjVjd3Jjc29COE9GNDdLNDcyYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib2wzQ1ZqUEh2UnNIMDR3T2s4UzlRK0h5VW9xd0dlK211MTRuaW94cEJTbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDRjJXZUQ0amtzTEx6MXZxWDlycS9yQ2FUVW5HalUrYnpnbW1iajk1SGx3PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJHMGwyTWxza3VOQ29kcWRzdlFwZGxFSzhVWHhUc3YxL1ZyUnYwaW1sNVh3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkNCdFU5aUxXTklWTmdnaVJwWU9QK1UvWW9lQzN1a1lQT3lWVGY3VGQrbEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlhyN2lINGtDTGVTQlRTa0ljOCtXWHpnUCt0NTNDeWpqWUh0ellHRy84RGM9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaUlIR0VnVHFxbkQ2WFlzSHBZaHBZOW4xVG1XNWRWVFVTeDBrTTZCTDIxMD0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZlpMQkdzemtDTm5LblhITXdGdXlDbWxheTJwbVk0Q0tVMGYxOHgybzdDbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjM5OHVuR0JuZ3N6MW9HaWlwM2pUNmYyVkhSS1Ruc2djWWxnUmUvTVVIeHpqYllnMkpaTTBpdzYzU3ViZWJhM2VPQVVpQmJpVnFqNG8yWWlNR2FKekN3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTg1LCJhZHZTZWNyZXRLZXkiOiJleUhYcjZzdmxIZlFmM0x4RVNOdExaUW5vVERJMitnVHl4Smo2NjVNcGI0PSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJ4NjRReEtLNlREdVJiaElic3lPR1lRIiwicGhvbmVJZCI6ImMyMGU3Yjg5LTEzNWMtNDM4Mi05MDQxLWVjZjMwYjFjYTcxOCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJWaGxRbEo4WXhMUm5GOWpqMXIxVU1mSGFYYkk9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWXZaOTcwSkhZODc0dFhTNHk0TmEzazZ0TlZrPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkM2QjlSQ01LIiwibWUiOnsiaWQiOiI5NDc3MzgyNDI2Njo3MkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiIuXG5cblxu8J2RrFxuXG5cblxuXG7wnZG5XG5cblxuXG5cbvCdkblcblxuXG5cblxu8J2RtlxuXG5cblxuXG7wnZG5XG5cblxuXG7wnZ+w8J2frPCdn7BcblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxu8JKNmSJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTXJVNGNjQkVOVHc3N2tHR0JFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5Ijoidk5BVUxjWXVXbU5mL3JNQXh1SjJYTXh1SDQ1alRnOTMzSVo3dEY1c0hnQT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiUkFsK090SWtvdi9zRjVzTlE3UlB5TlRXT1pFejFFSDJFcjF5ZitrVjc2YTY5S1dCdW5vaDQ5T3pkS2dXUjdjU3Y2NUVYdk1sY2IyallsWHdyMTlSREE9PSIsImRldmljZVNpZ25hdHVyZSI6InFVY21qRmM1UDBDMUkwOTZBNGhWdU9VMjdTRENaNUp1YWlTTXRzRlVDbkIvYWthU2xmblhnRkEyR0N3MENKdDdJTFlQYXRKT1lhSC9LZXY3Nm5idkR3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3NzM4MjQyNjY6NzJAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCYnpRRkMzR0xscGpYLzZ6QU1iaWRsek1iaCtPWTA0UGQ5eUdlN1JlYkI0QSJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczMTk4MzQ1NywibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDQVkifQ==',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "SoViYa",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "94773824266",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "non",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'SoVIYa MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/5462ea7070b61eb790caa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
