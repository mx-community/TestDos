import { search, download } from 'aptoide-scraper'
import fetch from 'node-fetch'
import Jimp from 'jimp'

var handler = async (m, { conn, usedPrefix, command, text }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de alguna aplicación o apk para descargarlo.\n\n• Por ejemplo:\n*#${command}* WhatsApp` }, { quoted: m })
try {
await m.react('📍')

let searchA = await search(text)
if (!searchA.length) return conn.sendMessage(m.chat, { text: `📍  No se ha encontrado la aplicación o apk que busca, intentalo de nuevo.` }, { quoted: m })
let data5 = await download(searchA[0].id)
let txt = `🝐✦  *APK/APP : MX*\n\n`
txt += `⊸❒ *Nombre:* ${data5.name}\n`
txt += `⊸❒ *Paquete:* ${data5.package}\n`
txt += `⊸❒ *Actualización:* ${data5.lastup}\n`
txt += `⊸❒ *Peso:* ${data5.size}\n\n📍  Descargando *[ ${data5.name} ]*, espere un momento...`

await conn.sendMessage(m.chat, { image: { url: data5.icon }, caption: txt }, { quoted: m })
if (data5.size.includes('GB') || parseFloat(data5.size.replace(' MB', '')) > 999) {
return await conn.sendMessage(m.chat, { text: `📍  El archivo es demasiado pesado, supera los 999MB, intentelo de nuevo.` }, { quoted: m })
}

let thumbnail = null
try {
const img = await Jimp.read(data5.icon)
img.resize(300, Jimp.AUTO)
thumbnail = await img.getBufferAsync(Jimp.MIME_JPEG)
} catch (err) {
console.log('Error al crear miniatura:', err)
}

await conn.sendMessage(
m.chat,
{
document: { url: data5.dllink },
mimetype: 'application/vnd.android.package-archive',
fileName: `${data5.name}.apk`,
caption: `> ${botname}\n*${data5.name}* descargado.`,
...(thumbnail ? { jpegThumbnail: thumbnail } : {})
},
{ quoted: fkontak }
)

} catch (error) {
console.error(error)
return await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.tags = ['descargas']
handler.help = ['apkmod']
handler.command = ['apk', 'app']

export default handler
