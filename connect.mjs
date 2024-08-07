import dgram from 'node:dgram';

const drone = (address, port) => {
  let server;

  const connect = () => {
    // if (server) return;
    server = dgram.createSocket('udp4');
    // console.log('created server');
    server.bind(port);
    // console.log(server);
  };

  const disconnect = () => {
    return new Promise((resolve) => {
      server.close(() => {
        resolve();
      });
    });
  };

  // const setWifi = async (ssid, password) => {
  //   await sendCommand('command');
  //   return sendCommand(`ap ${ssid} ${password}`);
  // };

  const sendCommand = (command) => {
    return new Promise((resolve, reject) => {
      console.log(`[${address}] SEND: ${command}`);

      server.once('message', (rawMsg) => {
        const message = rawMsg.toString().trim();
        console.log(`[${address}] RECEIVED: ${message}`);
        if (message === 'error') {
          console.log('error message');
          reject(message);
        } else {
          console.log('sending message');
          resolve(message);
        }
      });

      server.send(command, port, address);
    });
  };

  return {
    connect,
    sendCommand,
    disconnect,
  };
};

export default drone;
