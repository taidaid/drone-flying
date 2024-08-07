import drone from './connect.mjs';
// const drone = require('./connect.mjs');

const drone2 = drone('192.168.8.137', 8889);
const drone1 = drone('192.168.8.120', 8889);
const drone3 = drone('192.168.8.142', 8889);

const execute = async (...commands) => {
  for (const command of commands) {
    await command();
    console.log('-------------------------------');
  }
};
drone1.connect();
execute(
  drone1.command.takeoff(),
  // drone1.command.speed(75),
  // drone1.command.go(0, 0, 30, 50, 2),
  // drone1.command.forward(250),
  // drone1.command.go(0, 0, 60, 50, 2),
  // drone1.command.backward(250),
  // drone1.command.go(0, 0, 200, 50, 2),
  // drone1.command.forward(200),
  // drone1.command.go(0, 0, 50, 50, 2),
  // drone1.command.align(),
  // drone1.command.align(),
  // drone1.command.forward(50),
  // drone1.command.align(),
  // drone1.command.left(500),
  // drone1.command.forward(150),
  // drone1.command.right(200),
  // drone1.command.go(0, 0, 150, 50, 7),
  // drone1.command.right(180),
  // drone1.command.align(),
  // drone1.command.backward(420),
  // drone1.command.align(),
  // drone1.command.align(),
  drone1.command.land()
)
  .catch((error) => console.log(error))
  .finally(drone1.disconnect);
