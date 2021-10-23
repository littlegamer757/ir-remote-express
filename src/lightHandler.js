const exec = require('child_process').execSync;
// Still have to use this guy at some point, but that seems like a problem for future me.

const fs = require('fs');
const helper = require('./util/loggingHelper');

let lights = [];

const init = () => {
    readLights();
}

const updateLight = (lightId, newState) => {  // executes the appropriate syscalls for light events
    const light = findLightWithId(lightId);
    const result = {message: 'Command undefined'};

    if (!light) {
        result.message = 'Light undefined';
        return result;
    }

    const base = light.commandBase;
    const command = findLightCommand(lightId, newState);

    if (command) {
        const cmdFull = `${base} ${command.commandArguments}`;
        const message = `Applied action '${command.name}' to light ${lightId}`

        result.lightId = lightId;
        result.message = message;
        result.command = cmdFull;

        if (command.changesLightState) findLightWithId(lightId).lightState = command.changesLightStateTo;

        helper.log(message);
    }

    return result;
}

const getLightState = (light_id) => {
    const result = {state: 'Light not found'}
    const light = findLightWithId(light_id);
    if (!light) return result;
    result.state = light.lightState ?? 'Unknown state';
    return result;
}

// Helper functions

const readLights = () => {
    const raw = fs.readFileSync('src/res/lights.json').toString();
    const json = JSON.parse(raw);
    lights = Array.from(json);
};

const findLightWithId = (lightId) => lights.find(light => light.lightId === lightId);

const findLightCommand = (lightId, cmdName) => findLightWithId(lightId).commands.find(cmd => cmd.name === cmdName);

module.exports = {updateLight, retrieveLight: getLightState, init};