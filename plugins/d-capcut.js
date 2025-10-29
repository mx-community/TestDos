import fetch from "node-fetch";
import cheerio from "cheerio";
const handler = async (m, { conn, usedPrefix, command, text }) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m });
if (!text) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *CapCut* para descargarlo.` }, { quoted: m });
}
try {
await m.react("⏳")
//conn.sendMessage(m.chat, { text: `ⴵ _Descargando el pedido, espere un momento..._` }, { quoted: m });
const result = await capcutdl(text);
if (!result) {
return conn.sendMessage(m.chat, { text: `El enlace proporcionado no es valida, verifique si el enlace es de *CapCut.*`}, { quoted: m });
}
await conn.sendMessage(m.chat, { video: { url: result.videoUrl }, caption: `【 🎬 MP4 / ${result.title} ✓ 】` }, { quoted: m })
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}};

handler.command = ["capcut", "ct"];
export default handler;

async function capcutdl(url) {
try {
const response = await fetch(url);
const html = await response.text();
const $ = cheerio.load(html);
const videoElement = $('video.player-o3g3Ag');
const videoSrc = videoElement.attr('src');
const posterSrc = videoElement.attr('poster');
const title = $('h1.template-title').text().trim();
const actionsDetail = $('p.actions-detail').text().trim();
const [date, uses, likes] = actionsDetail.split(',').map(item => item.trim());
const authorAvatar = $('span.lv-avatar-image img').attr('src');
const authorName = $('span.lv-avatar-image img').attr('alt');

if (!videoSrc || !posterSrc || !title || !date || !uses || !likes || !authorAvatar || !authorName) {
throw new Error('Algunos elementos importantes no se encontraron en la página.');
}

return {
title: title,
date: date,
pengguna: uses,
likes: likes,
author: {
name: authorName,
avatarUrl: authorAvatar
},
videoUrl: videoSrc,
posterUrl: posterSrc
};
} catch (error) {
console.error('Error al obtener los detalles del video:', error.message);
return null;
}
}
