import fetch from 'node-fetch';
const handler = async (m, {conn, groupMetadata, usedPrefix, text, args, command}) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m });
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba un texto para crear un audio.\n\n• *Por ejemplo:*\n${usedPrefix + command} Hola` }, { quoted: m });
try {
await m.react("⏳");
const anu = await ringtone(text);
const result = anu[Math.floor(Math.random() * anu.length)];
conn.sendMessage(m.chat, {audio: {url: result.audio}, fileName: result.title+'.mp3', mimetype: 'audio/mpeg'}, {quoted: m});
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
 };
};
handler.command = ['ringtone', 'ring'];
export default handler;

async function ringtone(title) {
return new Promise((resolve, reject) => {
axios.get('https://meloboom.com/es/search/'+title).then((get) => {
const $ = cheerio.load(get.data);
const hasil = [];
$('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function(a, b) {
hasil.push({title: $(b).find('h4').text(), source: 'https://meloboom.com/'+$(b).find('a').attr('href'), audio: $(b).find('audio').attr('src')});
});
resolve(hasil);
});
});
}
