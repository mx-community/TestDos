import fetch from 'node-fetch'

let regex = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i
let handler = async (m, { args, usedPrefix, command }) => {
if (!args[0]) {
if (!db.data.chats[m.chat].fDescargas && m.isGroup) return conn.sendMessage(m.chat, { text: `📍  Lo siento, las funciones de *Descargas* estan desactivados en este momento.\n• Un administrador grupal puede activarlo usando el comando *#on descargas*.` }, { quoted: m })
return conn.sendMessage(m.chat, { text: `Ingrese el comando mas un enlace de un repositorio de *GitHub* para descargarlo.` }, { quoted: m })
}
if (!regex.test(args[0])) {
return conn.sendMessage(m.chat, { text: `El enlace que has ingresado no es valido, recuerde copiar un enlace de un repositorio de *GitHub* para descargarlo.` }, { quoted: m })
}
let [_, user, repo] = args[0].match(regex) || []
let sanitizedRepo = repo.replace(/.git$/, '')
let repoUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}`
let zipUrl = `https://api.github.com/repos/${user}/${sanitizedRepo}/zipball`
await m.react('⏳')
try {
let [repoResponse, zipResponse] = await Promise.all([fetch(repoUrl), fetch(zipUrl)])
let repoData = await repoResponse.json()
let filename = zipResponse.headers.get('content-disposition').match(/attachment; filename=(.*)/)[1]
let type = zipResponse.headers.get('content-type')
let contextoUrl = `
*GITHUB - DOWNLOAD*
┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄
⊸⊹ *Usuario:* ${repoData.owner.login}
⊸⊹ *Repo:* ${user}/${sanitizedRepo}
⊸⊹ *Archivo:* ${filename}
⊸⊹ *Enlace:* ${url}

📍  Se esta descargando el archivo, espere un momento...`
await conn.sendMessage(m.chat, { text: contextoUrl, contextInfo: { externalAdReply: { title: filename, body: repoData.owner.login, thumbnailUrl: img, sourceUrl: null, mediaType: 1, showAdAttribution: false, renderLargerThumbnail: false }}}, { quoted: m })
conn.sendFile(m.chat, await zipResponse.buffer(), filename, null, m)
} catch {
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}
handler.command = /^(git|github)$/i
export default handler
