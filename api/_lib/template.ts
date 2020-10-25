
import { sanitizeHtml } from './sanitizer';
import { ParsedRequest } from './types';
const twemoji = require('twemoji');
const twOptions = { folder: 'svg', ext: '.svg' };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss() {
    return `
    @import url('https://fonts.googleapis.com/css?family=Noto+Sans+JP:400,700');

    body {
        height: 100vh;
        background-color: #E5E5E5;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-family: 'Noto Sans JP', sans-serif;
        font-weight: bold;
        font-size: 40px;
    }
    .card {
        width: 80%;
        background-color: white;
        border-radius: 80px;
        padding: 64px;
        margin: 0 64px;
    }
    .card__text {
        margin: 24px 0 0;
        max-height: 600px;
        white-space: pre-wrap;
        overflow: hidden;
    }
    .card__avatar {
        height: 140px;
        width: 140px;
        border-radius: 9999px;
    }
    .card__footer__dot {
        margin: 16px 0;
    }
    .card__footer__continue {
        margin: 0;
        color: #9B9B9B;
    }
    `
}

export function getHtml(parsedReq: ParsedRequest) {
    const { text, lang, iconImage } = parsedReq;
    return `<!DOCTYPE html>
<html>
    <meta charset="utf-8">
    <title>Generated Image</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        ${getCss()}
    </style>
    <body>
        <div class="card">
            <img class="card__avatar" src="${sanitizeHtml(iconImage)}">
            <p class="card__text">${emojify(sanitizeHtml(text))}</p>
            <div class="card__footer">
                <p class="card__footer__dot">...</p>
                <p class="card__footer__continue">${lang === 'ja' ? '続きを読む' : 'Read More'}</p>
            </div>
            </div>
    </body>
</html>`;
}