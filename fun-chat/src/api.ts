import { eventEmitter } from './components/Event-emmiter/Event-emmiter';
import {
  ResponseAllUsers,
  ResponseUserAuth,
  ResponseThirdPartyUser,
  SocketSendMessage,
  ResponseMsgSend,
  ResponseError,
  FetchingMessagesWithUser,
  NotificationDeliveryStatusChanged
} from './types/interfaces';

const configure = {
  socket: 'ws://127.0.0.1:4000'
};

class Socket {
  socket: WebSocket;

  constructor() {
    this.socket = new WebSocket(configure.socket);
    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
      eventEmitter.emit('socket/connected', null);
    };
    this.socket.addEventListener('error', this.onError.bind(this));
    this.socket.addEventListener('message', this.onMessage.bind(this));
  }

  onMessage(event: MessageEvent) {
    const data = JSON.parse(event.data);
    if (data.type === 'USER_LOGIN') {
      const user: ResponseUserAuth = data;
      eventEmitter.emit('auth/logIn', user);
    }
    if (data.type === 'USER_LOGOUT') {
      const user: ResponseUserAuth = data;
      eventEmitter.emit('auth/logOut', user);
    }
    if (data.type === 'USER_ACTIVE') {
      const users: ResponseAllUsers = data;
      eventEmitter.emit('get/UserActive', users);
    }
    if (data.type === 'USER_INACTIVE') {
      const users: ResponseAllUsers = data;
      eventEmitter.emit('get/UserInActive', users);
    }
    if (data.type === 'USER_EXTERNAL_LOGIN') {
      const user: ResponseThirdPartyUser = data;
      eventEmitter.emit('server/UserLogIn', user);
    }
    if (data.type === 'USER_EXTERNAL_LOGOUT') {
      const user: ResponseThirdPartyUser = data;
      eventEmitter.emit('server/UserLogOut', user);
    }
    if (data.type === 'MSG_SEND') {
      const message: ResponseMsgSend = data;
      eventEmitter.emit('send/MessageTo', message);
    }
    if (data.type === 'MSG_FROM_USER') {
      const message: FetchingMessagesWithUser = data;
      eventEmitter.emit('history/UserMessages', message);
    }
    if (data.type === 'MSG_DELIVER') {
      const message: NotificationDeliveryStatusChanged = data;
      eventEmitter.emit('statusMsg/Delivered', message);
    }
    if (data.type === 'ERROR') {
      const message: ResponseError = data;
      eventEmitter.emit('error', message);
    }
  }

  onError = (error: Event) => {
    console.error('error', error);
  };

  sendMsg<T>(message: SocketSendMessage<T>) {
    this.socket.send(JSON.stringify(message));
  }
}

export const socket = new Socket();
