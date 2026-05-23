import serverless from 'serverless-http';
import { getReadyApp } from '../server/src/app.js';

let handler;

export default async function vercelHandler(req, res) {
  if (!handler) {
    const app = await getReadyApp();
    handler = serverless(app, {
      binary: false,
      request(req, _event, context) {
        context.callbackWaitsForEmptyEventLoop = false;
      },
    });
  }
  return handler(req, res);
}
