import axios from 'axios';

const handler = async (m, { conn, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de la musica que desea buscar.\n\n? Por ejemplo:\n*#${command}* Hopes and dreams` }, { quoted: m });
try {
await m.react('?');
const searchRes = await axios.get('https://delirius-apiofc.vercel.app/search/soundcloud', { params: { q: text, limit: 1 }});
const song = searchRes.data.data[0];
if (!song) return conn.sendMessage(m.chat, { text: `?  No se han encontrado resultados de la busqueda.\n? Verifique si esta bien escrito y vuelva a intentarlo.` }, { quoted: m })
const dlRes = await axios.get('https://api.siputzx.my.id/api/d/soundcloud', { params: { url: song.link } });
if (!dlRes.data.status) return conn.sendMessage(m.chat, { text: `?  No se ha podido descargar el audio, intentelo de nuevo.` }, { quoted: m });
const audio = dlRes.data.data;
const caption = `??  *MUSICAS : MX*

? *Título:* ${audio.title || 'Desconocido'}
? *Artista:* ${audio.user || 'Desconocido'}
? *Duración:* ${msToTime(audio.duration) || 'Desconocido'}
? *Descripción:* ${audio.description || 'Sin descripción'}
? *Enlace:* ${song.link || 'N/A'}

?  Descargando audio, espere un momento...`.trim();

await conn.sendMessage(m.chat, { text: caption }, { quoted: m });
conn.sendMessage(m.chat, {
audio: { url: audio.url },
fileName: `${audio.title}.mp3`,
mimetype: 'audio/mpeg',
ptt: false,
contextInfo: {
externalAdReply: {
title: `${audio.title}`,
body: `${audio.description || textoInfo}`,
thumbnailUrl: audio.thumbnail,
mediaType: 1,
renderLargerThumbnail: false
}}}, { quoted: m });
} catch (err) {
await conn.sendMessage(m.chat, { text: `*[ ? ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
};

function msToTime(ms) {
let seconds = Math.floor((ms / 1000) % 60),
minutes = Math.floor((ms / (1000 * 60)) % 60);
return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

handler.command = ['music', 'musica'];
handler.help = ['soundcloud <nombre>'];
handler.tags = ['descargas'];

export default handler;
