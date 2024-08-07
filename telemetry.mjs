import dgram from 'node:dgram';
import drone from './connect.mjs';
// const drone = require('./connect.mjs');

const execute = async (...commands) => {
  for (const command of commands) {
    await command();
    console.log('-------------------------------');
  }
};

const aligner = dgram.createSocket('udp4');
aligner.bind(8890);
aligner.on('message', async (msg) => {
  const telemetrics = msg
    .toString()
    .trim()
    .split(';')
    .reduce((acc, cur) => {
      const [key, val] = cur.split(':');
      return { ...acc, [key]: val };
    }, {});

  console.log(telemetrics.mid);
});
