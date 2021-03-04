const exec = require('child_process').execSync;
const fs = require('fs');
const helper = require('./util/loggingHelper');

let states = [];

let commands;
let base;

const updateLight = (light_id, light_state) => {  // executes the appropriate syscalls for light events
    if (light_id !== '1') return;

    const command = readCommand(light_state);
    const result = {message: 'Command undefined'};

    if (command) {
        const c = base + command.arguments;
        const message = `Applied action ${command.description} to light ${light_id}`

        result.message = message;
        result.command = c;

        helper.log(message);

        if (command.changesState === true) setState(light_id, command.name);
    }

    return result;
}

const retrieveLight = (light_id) => {  // returns the state of a given lamp
    if (light_id !== '1') return;

    const result = getState(light_id);
    return result ? result : 'off';
}

// Helper functions

const readCommand = (light_state) => {
    if (!commands) {
        const raw = fs.readFileSync('src/res/commands.json').toString();
        const json = JSON.parse(raw);

        commands = Array.from(json.commands);
        base = json.base;
    }

    return commands.filter(c => c.name === light_state)[0];
}

const setState = (light_id, newState) => {
    states[light_id - 1] = newState;
}

const getState = (light_id) => {
    return states[light_id - 1];
};

module.exports = {updateLight, retrieveLight};