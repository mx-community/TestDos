import axios from 'axios'

const handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba lo que quiera buscar en Google.\n\n• Por ejemplo:\n*#${command}* Arboles.` }, { quoted: m })
try {
await m.react('⏳')
const res = await getGoogleImageSearch(text)
const urls = await res.getAll()
if (urls.length < 2) return conn.sendMessage(m.chat, { text: `📍  No se encontraron imagenes relacionadas con la busqueda.` }, { quoted: m })
const medias = urls.slice(0, 10).map(url => ({ type: 'image', data: { url } }))
const caption = `📌 *[ ${text} ]* de imagenes encontrados...`
conn.sendMessage(m.chat, { text: caption }, { quoted: m })
await conn.sendSylphy(m.chat, medias, { null, quoted: m })
} catch (error) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.help = ['imagen']
handler.tags = ['descargas']
handler.command = ['imagen', 'image']

export default handler

function getGoogleImageSearch(query) {
const apis = [`${global.APIs.delirius.url}/search/gimage?query=${encodeURIComponent(query)}`, `${global.APIs.siputzx.url}/api/images?query=${encodeURIComponent(query)}`]
return { getAll: async () => {
for (const url of apis) {
try {
const res = await axios.get(url)
const data = res.data
if (Array.isArray(data?.data)) {
const urls = data.data.map(d => d.url).filter(u => typeof u === 'string' && u.startsWith('http'))
if (urls.length) return urls
}} catch {}
}
return []
},
getRandom: async () => {
const all = await this.getAll()
return all[Math.floor(Math.random() * all.length)] || null
}}}
