import maskEscapedCharsRegex from './maskEscapedCharsRegex';

const maskNotSpecialCharsRegex = new RegExp(`([^9aAh%#\\\\])|(${maskEscapedCharsRegex.source})`, 'g');

export default maskNotSpecialCharsRegex;
