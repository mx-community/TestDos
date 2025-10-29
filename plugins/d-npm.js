import { exec } from 'child_process';
import fs from 'fs';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m });
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre/paquete NPM para descargarlo.\n\n• *Por ejemplo:*\n${usedPrefix + command} node-fetch, 1.1.1.1` }, { quoted: m });
async function npmdownloader(pkg, pkgver) {
await m.react("⏳");
try {
const filePath = await new Promise((resolve, reject) => {
exec(`npm pack ${pkg}@${pkgver}`, (error, stdout) => {
if (error) {
m.reply('Error');
console.error(`exec error: ${error}`);
reject(error);
return;
}
resolve(stdout.trim());
});
});

const fileName = filePath.split('/').pop();
const data = await fs.promises.readFile(filePath);
let Link;
if (pkgver === 'latest') {
Link = `https://www.npmjs.com/package/${pkg}`;
} else {
Link = `https://www.npmjs.com/package/${pkg}/v/${pkgver}`;
}
let contextoNpm = `*${fileName}*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
⊸⊹ *Version:* ${pkgver}
⊸⊹ *Enlace:* ${Link}

📍  Descargando archivo, espere un momento...`;
await conn.sendMessage(m.chat, { text: contextoNpm }, { quoted: m });
await conn.sendMessage(m.chat, { document: data, mimetype: "application/zip", fileName: fileName, caption: `${fileName}\n` }, { quoted: m });

await fs.promises.unlink(filePath);
} catch (err) {
console.error(`Error: ${err}`);
}
}

try {
const [text2, ver] = text.split(",");
await npmdownloader(text2, ver || 'latest');
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.command = ["npmdl", "npm"];

export default handler;
