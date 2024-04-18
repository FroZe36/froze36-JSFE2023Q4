import { Message } from './types/interfaces';

const configure = {
  socket: 'ws://127.0.0.1:4000'
};

export class Socket {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(configure.socket);
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };
    this.socket.onerror = (error) => {
      console.error('error', error);
    };
    this.socket.onmessage = (event) => {
      console.log(event.data);
      const data = JSON.parse(event.data);
      console.log(data);
      if (data.type === 'ERROR') {
        console.error('error msg:', data.payload.error);
      }
    };
  }

  sendMsg(message: Message) {
    this.socket.send(JSON.stringify(message));
  }
}
