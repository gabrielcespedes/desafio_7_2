const fs = require('fs');

const canciones_function = () => {
    const data = JSON.parse(fs.readFileSync('./canciones.json', 'utf8'));
    return data;
}

const write_function = (songs) => {
    fs.writeFileSync('./canciones.json', JSON.stringify(songs));
}

const find_function = (songs, i) => {
    const k = songs.findIndex(c => c.id == i);
    return k;
}

module.exports = {canciones_function, write_function, find_function};