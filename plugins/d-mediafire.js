import fetch from 'node-fetch'
import { lookup } from 'mime-types'
let handler = async (m, { conn, text, usedPrefix }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un archivo de *Mediafire* para descargarlo.` }, { quoted: m })
if (!/^https:\/\/www\.mediafire\.com\//i.test(text)) return conn.sendMessage(m.chat, { text: `📍  El enlace que has ingresado no es correcto.\n• Verifique si el enlace es de *Mediafire* y vuelva a intentarlo.` }, { quoted: m })
try {
await m.react('⏳')
const res = await fetch(`${global.APIs.delirius.url}/download/mediafire?url=${encodeURIComponent(text)}`)
const json = await res.json()
const data = json.data
if (!json.status || !data?.filename || !data?.link) return conn.sendMessage(m.chat, { text: `📍  No se ha podido acceder al enlace, vuelva a intentarlo.` }, { quoted: m })
const filename = data.filename
const filesize = data.size || 'desconocido'
const mimetype = data.mime || lookup(data.extension?.toLowerCase()) || 'application/octet-stream'
const dl_url = data.link.includes('u=') ? decodeURIComponent(data.link.split('u=')[1]) : data.link
const caption = `❒ *Nombre:* ${filename}
❒ *Peso:* ${filesize}
❒ *Tipo:* ${mimetype}`
await conn.sendMessage(m.chat, { text: `📍  Descargando *[ ${filename} ]*, espere un momento...` }, { quoted: m })
conn.sendMessage(m.chat, { document: { url: dl_url }, fileName: filename, mimetype, caption }, { quoted: m })
} catch (e) {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}}

handler.command = ['mf', 'mediafire']
handler.help = ['mediafire']
handler.tags = ['descargas']

export default handler
