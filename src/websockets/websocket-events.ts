import { WebSocket } from 'ws';

export default function websocketEvents(ws: WebSocket) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
    ws.send('Your message has been received successfully!');
  });
}
