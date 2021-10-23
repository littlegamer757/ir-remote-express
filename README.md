# ExpressJS-API for Raspberry Pi IR-Remote

Express API to communicate with Raspberry Pi, which is used as an IR remote, over the network

### Notes:

- A light's state: Whether the light is on or off
- A command for a light: E.g. turn on/off, change brightness. Can change the light's state, but doesn't have to.

### Usage:

`npm start` starts the express server, listening on port 3000.