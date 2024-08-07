import dgram from 'node:dgram';
const drone = (address, port) => {
  let server;
  const connect = () => {
    server = dgram.createSocket('udp4');
    server.bind(port);
  };
  const disconnect = () => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  };
  const setWifi = async (ssid, password) => {
    await sendCommand('command');
    return sendCommand(`ap ${ssid} ${password}`);
  };
  const sendCommand = (command) => {
    return new Promise((resolve, reject) => {
      console.log(`[${address}] SEND: ${command}`);
      server.once('message', (rawMsg) => {
        const message = rawMsg.toString().trim();
        console.log(`[${address}] RECEIVED: ${message}`);
        if (message === 'error') {
          reject(message);
        } else {
          resolve(message);
        }
      });
      server.send(command, port, address);
    });
  };
  const command = {
    takeoff: () => async () => {
      await sendCommand('command');
      return sendCommand('takeoff');
    },
    left: (distance) => () => {
      return sendCommand(`left ${distance}`);
    },
    right: (distance) => () => {
      return sendCommand(`right ${distance}`);
    },
    forward: (distance) => () => {
      return sendCommand(`forward ${distance}`);
    },
    backward: (distance) => () => {
      return sendCommand(`back ${distance}`);
    },
    land: () => () => {
      return sendCommand('land');
    },
    speed: (num) => () => {
      return sendCommand(`speed ${num}`);
    },
    go: (x, y, z, speed, padId) => () => {
      return sendCommand(`go ${x} ${y} ${z} ${speed} m${padId}`);
    },
    align: () => () => {
      return new Promise((resolve) => {
        const aligner = dgram.createSocket('udp4');
        aligner.bind(8890);
        aligner.once('message', async (msg) => {
          const telemetrics = msg
            .toString()
            .trim()
            .split(';')
            .reduce((acc, cur) => {
              const [key, val] = cur.split(':');
              return { ...acc, [key]: val };
            }, {});
          aligner.close();
          await sendCommand(
            `go ${telemetrics.x * -1} ${telemetrics.y * -1} 100 50 m${
              telemetrics.mid
            }`
          );
          resolve();
        });
      });
    },
  };
  return {
    connect,
    disconnect,
    setWifi,
    command,
  };
};
export default drone;
