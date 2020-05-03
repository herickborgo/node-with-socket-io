import { createServer } from 'http'
import router from './src/router';

const server = createServer(router().app);
router().server(server);

server.listen(80);
console.log('Server listen on port: 80');
