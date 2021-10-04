const dateFormat = require('dateformat');

const getDate = () => {
    const now = new Date();
    const formatted = dateFormat(now, "dd.mm.yyyy HH:MM");
    return `[${formatted}]`;
}

const log = (message) => {
    console.log(`[LOG] ${getDate()} ${message}`);
}

const error = (message, err) => {
    let s = `[ERROR] ${getDate()} ${message}`;
    if (err) s += err;
    console.log(s);
}

module.exports = {log, error};