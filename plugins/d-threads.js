import axios from "axios";

const handler = async (m, { conn, args, command, usedPrefix }) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m });
if (!args[0]) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video o imagen de *Threads* para descargarlo.` }, { quoted: m });
try {
const res = await axios.get(global.baseapi_delirius + "/download/threads", { params: { url: args[0] }});
if (res.data.status && res.data.data.media.length > 0) {
const contextoTh = `
*THREADS - DOWNLOAD*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄

⊸⊹ *Usuario:* ${res.data.data.username || "---"}
⊸⊹ *Likes:* ${res.data.data.likes || "---"}
⊸⊹ *Enlace:* ${args[0].trim()}

📍  Se esta descargando el contenido, espere un momento...`;
await conn.sendMessage(m.chat, { text: contextoTh }, { quoted: m });
const media = res.data.data.media;
for (const item of media) {
if (item.type === "image") {
await conn.sendMessage(m.chat, { image: { url: item.url } }, { quoted: m } );
} else if (item.type === "video") {
await conn.sendMessage(m.chat, { video: { url: item.url } }, { quoted: m } );
    }
  }
} else {
await conn.sendMessage(m.chat, { text: `No se han encontrado resultados en el enlace, verifique el enlace coincide y vuelva a intentarlo.` }, { quoted: m });
}
} catch (err) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
console.log(new Error(err).message);
}
};

handler.command = ["threads", "th"];

export default handler;

/* 
import fetch from 'node-fetch'
import axios from 'axios'
import cheerio from 'cheerio'
const handler = async (m, {conn, text, args, usedPrefix, command}) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de *Threads* para descargarlo.` }, { quoted: m })
try {
//await m.react("⏳")
await conn.sendMessage(m.chat, { text: `Descargando el video, espere un momento...` }, { quoted: m })
const apiUrl = `${apis}/download/threads?url=${encodeURIComponent(text)}`
const response = await fetch(apiUrl)
const jsonData = await response.json()
const threadTitle = jsonData.data.description
const threadVideoUrl = jsonData.data.media[0].url
const shortUrl1 = await (await fetch(`https://tinyurl.com/api-create.php?url=${text}`)).text()
const threadTitleWithoutUrl = threadTitle
await conn.sendMessage(m.chat, { video: { url: threadVideoUrl }, caption: `🎬*Video de Threads descargado.*` }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
console.log(e)
}
}
handler.command = ["th", "threads"]
export default handler
const delay = (time) => new Promise((res) => setTimeout(res, time))
*/
