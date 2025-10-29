import axios from 'axios';
const handler = async (m, { text, conn, args }) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m });
if (!args[0]) {
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un video de *Kwaii* para descargarlo.` }, { quoted: m });
}
const kwaiUrl = args[0];
let res;
try {
await m.react('⏳');
res = await axios.get(`https://api.nexfuture.com.br/api/downloads/kwai/dl?url=${kwaiUrl}`);
} catch (e) {
return conn.sendMessage(m.chat, { text: `No se han encontrado resultados, verifique si el enlace es correcto y vuelva a intentarlo.` }, { quoted: m });
}
const result = res.data;
if (!result.status) {
return conn.sendMessage(m.chat, { text: `No se han encontrado resultados, verifique si el enlace es correcto y vuelva a intentarlo.` }, { quoted: m });
}

const videoTitle = result.resultado.titulo;
const videoDescription = result.resultado.descricao;
const videoCreator = result.resultado.criador.nome;
const videoUrl = result.resultado.video;
const thumbnailUrl = result.resultado.thumbnail;

if (!videoUrl) {
return conn.sendMessage(m.chat, { text: `No se ha encontrado el video, verifique si el enlace es valido para descargar.` }, { quoted: m });
}

const contexVideo = `
⊸⊹ *Titulo:* ${videoTitle}
⊸⊹ *Creador:* ${videoCreator}
⊸⊹ *Publicado:* ${new Date(result.resultado.publicado).toLocaleString()}

📍  Video de Kwaii descargado.
`.trim();

const maxRetries = 3;
for (let attempt = 1; attempt <= maxRetries; attempt++) {
try {
await conn.sendMessage(m.chat, { video: { url: videoUrl }, caption: caption, thumbnail: thumbnailUrl, mimetype: 'video/mp4' }, { quoted: m });
break;
} catch (e) {
if (attempt === maxRetries) {
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
await new Promise(resolve => setTimeout(resolve, 1000));
}
}
}

handler.tags = ['descargas'];
handler.command = ['kwaii', 'kw'];
export default handler;
