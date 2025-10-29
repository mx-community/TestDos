import { File } from 'megajs'
import mime from 'mime-types'
let handler = async (m, {conn, args, usedPrefix, text, command}) => {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m })
try {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un archivo de *Mega* para descargarlo.` }, { quoted: m })
// await m.react("⏳")
await conn.sendMessage(m.chat, { text: `Descargando el archivo, espere un momento...` }, { quoted: m })
const file = File.fromURL(text)
await file.loadAttributes()
const fileExtension = file.name.split('.').pop().toLowerCase()
const mimeType = mime.lookup(fileExtension)
let caption = `
*${file.name}*
⊹┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄⊹
⊸⊹ *Peso:* ${formatBytes(file.size)}
⊸⊹ *Tipo:* ${mimeType}

📍  Se esta descargando el archivo, espere un momento...`.trim()
conn.reply(m.chat, caption, m)
if (file.size >= 1800000000 && !file.directory) return m.reply('Error: El archivo es muy pesado')
const data = await file.downloadBuffer()
await conn.sendFile(m.chat, data, file.name, null, m, null, {mimeType, asDocument: true})
} catch (error) {
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.help = ['mega']
handler.tags = ['downloader']
handler.command = ["mega", "mg"]
export default handler

function formatBytes(bytes) {
if (bytes === 0) return '0 Bytes'
const k = 1024
const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
const i = Math.floor(Math.log(bytes) / Math.log(k))
return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
