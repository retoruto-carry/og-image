import { IncomingMessage } from 'http';
import { parse } from 'url';
import { ParsedRequest } from './types';

export function parseRequest(req: IncomingMessage) {
    console.log('HTTP ' + req.url);
    const { pathname, query } = parse(req.url || '/', true);
    const { iconImage, lang } = (query || {});

    if (Array.isArray(iconImage)) {
        throw new Error('Expected a single iconImage');
    }
    if (Array.isArray(lang)) {
        throw new Error('Expected a single lang');
    }
    if (!(lang === 'ja' || lang === 'en')) {
        throw new Error('Expected lang is ja or en');
    }

    const arr = (pathname || '/').slice(1).split('.');
    let extension = '';
    let text = '';
    if (arr.length === 0) {
        text = '';
    } else if (arr.length === 1) {
        text = arr[0];
    } else {
        extension = arr.pop() as string;
        text = arr.join('.');
    }

    const parsedRequest: ParsedRequest = {
        fileType: extension === 'jpeg' ? extension : 'png',
        text: decodeURIComponent(text),
        iconImage: iconImage,
        lang: lang,
    };
    return parsedRequest;
}
