import axios from 'axios';

let handler = async (m, { conn, usedPrefix, command, text }) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m });
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Ifunny* para descargarlo.` }, { quoted: m });
await m.react('⏳');
try {
const response = await axios.get(`https://apis-starlights-team.koyeb.app/starlight/Ifunny-dl?text=${encodeURIComponent(text)}`);
if (response.status === 200) {
const videoData = response.data.video;
let contextoUrl = `⊸⊹ *Creador:* ${response.data.creator}
⊸⊹ *Formato:* ${videoData.format}
⊸⊹ *Calidad:* ${videoData.quality}
⊸⊹ *Enlace:* ${videoData.url}

📍  Video de Ifunny descargado.`;

await conn.sendMessage(m.chat, { video: { url: videoData.url }, caption: contextoUrl }, { quoted: m });
} else {
conn.sendMessage(m.chat, { text: `No se han encontrado resultados, verifique si el enlace es correcto y vuelva a intentarlo.` }, { quoted: m });
}
} catch (error) {
console.error(error);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 }
}

handler.command = ['ifunny', 'dif'];
export default handler;
