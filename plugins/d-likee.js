import axios from 'axios';
let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m });
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Likee* para descargarlo.` }, { quoted: m });
await conn.sendMessage(m.chat, { text: `Descargando el video, espere un momento...` }, { quoted: m });
try {
const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/like-downloader?url=${encodeURIComponent(text)}`);
if (response.data) {
const videoData = response.data;
await conn.sendMessage(m.chat, { video: { url: videoData.links['no watermark'] }, caption: "" }, { quoted: m });
} else {
await conn.sendMessage(m.chat, { text: `No se han encontrado resultados en el enlace, verifique si el enlace es correcto y vuelva a intentarlo.` }, { quoted: m });
}
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
}

handler.command = ['likee', 'lik'];
export default handler;
