import os from 'os'
import moment from 'moment-timezone'
import speed from 'performance-now'

let handler = async (m, { conn }) => {
try {
await m.react('⏳')
conn.sendPresenceUpdate('composing', m.chat)

let mentionedJid = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.sender
let totalCommands = Object.keys(global.plugins).length
const iconos = [
'https://qu.ax/TPfmC.jpg'
]
const randomIcono = iconos[Math.floor(Math.random() * iconos.length)]

let timestamp = speed()
let ping = (speed() - timestamp).toFixed(2)

// 🕓 Uptime
let uptime = clockString(process.uptime() * 1000)

// 🖥️ RAM info
let total = (os.totalmem() / 1024 / 1024).toFixed(0)
let free = (os.freemem() / 1024 / 1024).toFixed(0)
let used = total - free

// 📅 Fecha y hora
let fecha = moment.tz('America/Lima').format('DD/MM/YYYY')
let hora = moment.tz('America/Lima').format('HH:mm:ss')
let dia = moment.tz('America/Lima').format('dddd')
let menu = `
📍  Hola usuario @${mentionedJid.split('@')[0]}, aqui esta la lista de todos los comandos disponibles en este bot.

❒ *Mode:* » ${(conn.user.jid == global.conn.user.jid ? 'Principal.' : 'Pre-Bot.')}*
❒ *Actividad:* » ${uptime}
❒ *RAM usado:* » ${used} MB.
❒ *RAM libre:* » ${free} MB.
❒ *PING:* » ${ping} ms.


•─•【 \`ECONOMIA\` 】
> • _Comandos de economia._
⊸⊹› #work | #w | #trabajar
⊸⊹› #slut | #prostituirse
⊸⊹› #miming | #minar | #mine
⊸⊹› #aventura | #adventure
⊸⊹› #cazar | #hunt
⊸⊹› #fish | #pescar
⊸⊹› #mazmorra | #dungeon
⊸⊹› #casino | #slot [cantidad]
⊸⊹› #coinflip | #flip | #cf [cantidad] <cara/cruz>
⊸⊹› #roulette | #rt [red/black] [cantidad]
⊸⊹› #crime | #crimen
⊸⊹› #balance | #bal | #bank <usuario>
⊸⊹› #deposit | #dep | #d [cantidad] | all
⊸⊹› #withdraw | #with | #retirar [cantidad] | all
⊸⊹› #givecoins | #pay | #coinsgive <@usuario> [cantidad]
⊸⊹› #economyboard | #eboard | #baltop <página>
⊸⊹› #economyinfo | #einfo
⊸⊹› #daily | #diario
⊸⊹› #weekly | #semanal
⊸⊹› #monthly | #mensual
⊸⊹› #cofre | #coffer
⊸⊹› #steal | #robar | #rob <@usuario>
⊸⊹› #curar | #heal


•─•【 \`DESCARGADORES\` 】
> • _Comandos para descargas._
⊸⊹› #play | #play2 + [canción]
⊸⊹› #ytmp3 | #ytmp4 + [link]
⊸⊹› #ytsearch | #search + [búsqueda]
⊸⊹› #tiktok | #tt + [link / búsqueda]
⊸⊹› #ig | #instagram + [link]
⊸⊹› #twitter | #x + [link]
⊸⊹› #facebook | #fb + [link]
⊸⊹› #pinterest | #pin + [búsqueda / link]
⊸⊹› #mediafire | #mf + [link]
⊸⊹› #mega | #mg + [link]
⊸⊹› #apk | #modapk + [búsqueda]
⊸⊹› #image | #imagen + [búsqueda]


•─•【 \`CW : ROL\` 】
> • _Comandos de roles._
⊸⊹› #buycharacter | #buychar | #buyc + [nombre]
⊸⊹› #claim | #c | #reclamar {citar personaje}
⊸⊹› #delclaimmsg | #deletewaifu | #delchar + [nombre]
⊸⊹› #setclaimmsg | #setclaim + [mensaje]
⊸⊹› #charimage | #waifuimage | #wimage + [nombre]
⊸⊹› #charinfo | #winfo | #waifuinfo + [nombre]
⊸⊹› #serieinfo | #ainfo | #animeinfo + [nombre]
⊸⊹› #serielist | #slist | #animelist
⊸⊹› #gachainfo | #ginfo | #infogacha
⊸⊹› #sell | #vender + [precio] [nombre]
⊸⊹› #removesale | #removerventa + [precio] [nombre]
⊸⊹› #trade | #intercambiar + [tu personaje] / [personaje 2]
⊸⊹› #givechar | #givewaifu | #regalar + [@usuario] [nombre]
⊸⊹› #giveallharem + [@usuario]
⊸⊹› #rollwaifu | #rw | #roll
⊸⊹› #robwaifu | #robarwaifu + [@usuario]
⊸⊹› #favoritetop | #favtop
⊸⊹› #waifusboard | #waifustop | #topwaifus | #wtop + [número]
⊸⊹› #harem | #waifus | #claims + <@usuario>
⊸⊹› #haremshop | #tiendawaifus | #wshop + <página>


•─•【 \`CONEXIONES\` 】
> • _Comandos de conexion._
⊸⊹› #qr | #code
⊸⊹› #bots | #botlist
⊸⊹› #status | #estado
⊸⊹› #p | #ping
⊸⊹› #join + [invitación]
⊸⊹› #leave | #salir
⊸⊹› #logout
⊸⊹› #setpfp | #setimage
⊸⊹› #setstatus + [estado]
⊸⊹› #setusername + [nombre]


•─•【 \`ALEATORIOS\` 】
> • _Comandos aleatorios._
⊸⊹› #help | #menu
⊸⊹› #sc | #script
⊸⊹› #reporte | #reportar
⊸⊹› #sug | #suggest
⊸⊹› #calcular | #cal
⊸⊹› #delmeta
⊸⊹› #getpic | #pfp + [@usuario]
⊸⊹› #say + [texto]
⊸⊹› #setmeta + [autor] | [pack]
⊸⊹› #sticker | #s | #wm {imagen/video}
⊸⊹› #toimg | #img {sticker}
⊸⊹› #brat | #bratv | #qc | #emojimix
⊸⊹› #enhance | #remini | #hd
⊸⊹› #letra | #style
⊸⊹› #google
⊸⊹› #wiki | #wikipedia
⊸⊹› #ia | #gemini
⊸⊹› #dalle | #flux
⊸⊹› #npmdl | #nmpjs
⊸⊹› #gitclone + [link]
⊸⊹› #tourl | #catbox
⊸⊹› #ss | #ssweb
⊸⊹› #read | #readviewonce
⊸⊹› #translate | #traducir | #trad


•─•【 \`UTILIDADES\` 】
> • _Comandos utiles._
⊸⊹› #leaderboard | #lboard | #top + <página>
⊸⊹› #level | #lvl + <@usuario>
⊸⊹› #marry | #casarse + <@usuario>
⊸⊹› #divorce
⊸⊹› #profile + <@usuario>
⊸⊹› #setbirth + [fecha]
⊸⊹› #delbirth
⊸⊹› #setdescription | #setdesc + [descripción]
⊸⊹› #deldescription | #deldesc
⊸⊹› #setgenre + Hombre | Mujer
⊸⊹› #delgenre | #delgenero
⊸⊹› #setfavourite | #setfav + [personaje]
⊸⊹› #prem | #vip


•─•【 \`GRUPOS\` 】
> • _Comandos para grupos._
⊸⊹› #tag | #hidetag | #invocar | #tagall + [mensaje]
⊸⊹› #admins | #admin + [texto]
⊸⊹› #del | #delete {citar un mensaje}
⊸⊹› #antilink | #antienlace [enable/disable]
⊸⊹› #onlyadmin [enable/disable]
⊸⊹› #bot [enable/disable]
⊸⊹› #nsfw [enable/disable]
⊸⊹› #economy [enable/disable]
⊸⊹› #gacha [enable/disable]
⊸⊹› #welcome | #bienvenida [enable/disable]
⊸⊹› #detect | #alertas [enable/disable]
⊸⊹› #gpname | #groupname [texto]
⊸⊹› #gpdesc | #groupdesc [texto]
⊸⊹› #gpbanner | #groupimg
⊸⊹› #setwelcome [texto]
⊸⊹› #setbye [texto]
⊸⊹› #setprimary [@bot]
⊸⊹› #restablecer | #revoke
⊸⊹› #add | #añadir | #agregar {número}
⊸⊹› #kick <@usuario> | {mención}
⊸⊹› #promote <@usuario> | {mención}
⊸⊹› #demote <@usuario> | {mención}
⊸⊹› #inactivos | #kickinactivos
⊸⊹› #listnum | #kicknum [texto]
⊸⊹› #addwarn | #warn <@usuario>
⊸⊹› #unwarn | #delwarn <@usuario>
⊸⊹› #advlist | #listadv
⊸⊹› #link
⊸⊹› #gp | #infogrupo
⊸⊹› #linea | #listonline
⊸⊹› #close | #cerrar
⊸⊹› #open | #abrir


•─•【 \`ANIME\` 】
> • _Comandos de animes._
⊸⊹› #angry | #enojado <@mención>
⊸⊹› #blush | #sonrojarse <@mención>
⊸⊹› #cry | #llorar <@mención>
⊸⊹› #laugh | #reirse <@mención>
⊸⊹› #sad | #triste <@mención>
⊸⊹› #cringe | #avergonzarse <@mención>
⊸⊹› #think | #pensar <@mención>
⊸⊹› #bored | #aburrido <@mención>
⊸⊹› #love | #amor | #enamorado <@mención>
⊸⊹› #kiss | #muak <@mención>
⊸⊹› #kisscheek | #beso <@mención>
⊸⊹› #hug | #abrazar <@mención>
⊸⊹› #highfive | #5 <@mención>
⊸⊹› #handhold | #mano <@mención>
⊸⊹› #pat | #palmadita <@mención>
⊸⊹› #wink | #guiñar <@mención>
⊸⊹› #cuddle | #acurrucarse <@mención>
⊸⊹› #bite | #morder <@mención>
⊸⊹› #lick | #lamer <@mención>
⊸⊹› #eat | #comer <@mención>
⊸⊹› #coffee | #café <@mención>
⊸⊹› #dance | #bailar <@mención>
⊸⊹› #bath | #bañarse <@mención>
⊸⊹› #walk | #caminar <@mención>
⊸⊹› #run | #correr <@mención>
⊸⊹› #smoke | #fumar <@mención>
⊸⊹› #spit | #escupir <@mención>
⊸⊹› #punch | #golpear <@mención>
⊸⊹› #slap | #bofetada <@mención>
⊸⊹› #facepalm | #palmada <@mención>
⊸⊹› #kill | #matar <@mención>
⊸⊹› #step | #pisar <@mención>
⊸⊹› #poke | #picar <@mención>
⊸⊹› #bully | #bullying <@mención>
⊸⊹› #seduce | #seducir <@mención>
⊸⊹› #shy | #tímido <@mención>
⊸⊹› #dramatic | #drama <@mención>
⊸⊹› #drunk | #borracho <@mención>
⊸⊹› #smug | #presumir <@mención>
⊸⊹› #happy | #feliz <@mención>
⊸⊹› #pout | #pucheros <@mención>
⊸⊹› #preg | #embarazar <@mención>
⊸⊹› #waifu
⊸⊹› #ppcouple | #ppcp

> ${textoInfo}`

await conn.sendMessage(m.chat, { text: ``, mentions: await conn.parseMention(menu), contextInfo: { externalAdReply: { title: botname, body: textoInfo, thumbnail: xImagen2, sourceUrl: null, mediaType: 1, renderLargerThumbnail: true }}}, { quoted: fkontak })
  //conn.sendMessage(m.chat, { text: menu, contextInfo: { externalAdReply: { title: botname, body: textoInfo, thumbnailUrl: [xImagen, xImagen2, xImagen3].getRandom(), sourceUrl: null, mediaType: 1, showAdAttribution: true, renderLargerThumbnail: true }}} , { quoted: m })

} catch (e) {
console.error(e)
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m })
}
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'menú', 'help']

export default handler

function clockString(ms) {
let h = Math.floor(ms / 3600000)
let m = Math.floor(ms / 60000) % 60
let s = Math.floor(ms / 1000) % 60
return [h, m, s].map(v => v.toString().padStart(2, '0')).join(':')
}

