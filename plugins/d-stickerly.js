import fetch from 'node-fetch';
import baileys from '@whiskeysockets/baileys';

const { generateWAMessageContent, generateWAMessageFromContent, proto } = baileys;

const STICKERLY_API = "https://delirius-apiofc.vercel.app/search/stickerly";

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.sendMessage(m.chat, { text: `Ingrese el comando y escriba el nombre de un pack de *Sticker.Ly* para buscarlo.\n\n• Por ejemplo:\n*#${command}* Caballo Juan` }, { quoted: m });
await m.react('⏳');
try {
const res = await fetch(`${STICKERLY_API}?query=${encodeURIComponent(text)}`);
const json = await res.json();

if (!json.status || !json.data || json.data.length === 0) return conn.sendMessage(m.chat, { text: `📍  No se han encontrado resultados de la busqueda *[ ${text} ]*, intentelo de nuevo.` }, { quoted: m });

const results = json.data.slice(0, 15);

async function createImage(url) {
const { imageMessage } = await generateWAMessageContent(
{ image: { url } },
{ upload: conn.waUploadToServer }
);
return imageMessage;
}

let paqueteXd = `🝐✦  *STICKER.LY*
⊸❒ *Nombre:* ${pack.name}
⊸❒ *Autor:* ${pack.author}
⊸❒ *Stickers:* ${pack.sticker_count}
⊸❒ *Vistas:* ${pack.view_count}
⊸❒ *Exportados:* ${pack.export_count}`;

let cards = [];
for (let pack of results) {
let image = await createImage(pack.preview);
cards.push({body: proto.Message.InteractiveMessage.Body.fromObject({
text: paqueteXd
}),
footer: proto.Message.InteractiveMessage.Footer.fromObject({
text: '📍  Seleccione el boton de su preferencia.'
}),
header: proto.Message.InteractiveMessage.Header.fromObject({
title: '',
hasMediaAttachment: true,
imageMessage: image
}),
nativeFlowMessage: proto.Message.InteractiveMessage.NativeFlowMessage.fromObject({
buttons: [
{ name: 'cta_copy', buttonParamsJson: JSON.stringify({ display_text: "📌 Copiar.", id: "lyd", copy_code: `#lyd ${pack.url}`)}}
{ name: 'quick_reply', buttonParamsJson: JSON.stringify({ display_text: "📥 Descargar.", id: "lyd", quick_reply: `#lyd ${pack.url}`)}},
]
})
});
}

const msg = generateWAMessageFromContent(m.chat, {
viewOnceMessage: {
message: {
messageContextInfo: {
deviceListMetadata: {},
deviceListMetadataVersion: 2
},
interactiveMessage: proto.Message.InteractiveMessage.fromObject({
body: proto.Message.InteractiveMessage.Body.create({
text: `🝐✦  *STICKER.LY*\n\n❒ *Busqueda:* ${text}\n❒ *Packs:* ${results.length} packs encontrados.`
}),
footer: proto.Message.InteractiveMessage.Footer.create({
text: `📍  Lista de packs en *Sticker.Ly* por ${botname}`
}),
header: proto.Message.InteractiveMessage.Header.create({
hasMediaAttachment: false
}),
carouselMessage: proto.Message.InteractiveMessage.CarouselMessage.fromObject({
cards
})
})
}
}
}, { quoted: m });

await conn.relayMessage(m.chat, msg.message, { messageId: msg.key.id });

} catch (e) {
console.error(e);
await conn.sendMessage(m.chat, { text: `*[ 📍 ]*  ERROR_COMMAND = Command error, try again and if the error persists, report the command.` }, { quoted: m });
}
};

handler.help = ['stickerly <texto>'];
handler.tags = ['sticker'];
handler.command = ['stickerly'];

export default handler;
