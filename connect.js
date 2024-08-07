import dgram from 'node:drgam';

let server;

const connect = () => {
  server = dgram.createSocket("udp4");
  server.bind(port);
};