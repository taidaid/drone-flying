import drone from './connect.mjs';
// const drone = require('./connect.mjs');

const drone2 = drone('192.168.8.137', 8889);
const drone1 = drone('192.168.8.120', 8889);
// const drone3 = drone('192.168.8.142', 8889);

// const drones = [drone1, drone2, drone3];

const executeCommandForAllDrones = (command) => {
  drones.forEach((drone) => {
    command(drone);
  });
};

// const takeOff = async () => {

drone1.connect();
await drone1.sendCommand('takeoff');
// };

// const connectDrone = async () => {
// };

// connectDrone();
// takeOff();

// executeCommandForAllDrones(connectDrone);
// executeCommandForAllDrones(takeOff);
