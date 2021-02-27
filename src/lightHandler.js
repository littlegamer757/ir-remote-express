const exec = require('child_process').execSync;
const fs = require('fs');

let commands;
let base;

const handleLights = (light_id, light_state) => {  // executes the appropriate syscalls for light events
    if (light_id !== '1') return;

    const command = readCommand(light_state);
    const result = {message: 'Command undefined'};

    if (command) {
        const c = base + command.arguments;

        result.message = `Applied action ${command.description} to light ${light_id}`;
        result.command = c;

        // exec(c, (error, stdout, stderr) => {
        //     console.log('stdout: ', stdout);
        //     console.log('stderr: ', stderr);
        //     if (error) console.log('exec error: ', error)
        // });
    }

    return result;
}

const readCommand = (light_state) => {
    if (!commands) {
        const raw = fs.readFileSync('src/res/commands.json').toString();
        const json = JSON.parse(raw);

        commands = Array.from(json.commands);
        base = json.base;
    }

    return commands.filter(c => c.name === light_state)[0];
}

module.exports = {handleLights};