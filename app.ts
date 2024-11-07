import pjson from './package.json';

import express, { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';

const app: express.Application = express();
const b_r: string = '/v' + pjson.version;

app.use(cors());
app.use(requestIp.mw());
app.use(bodyParser.json({ type: "application/json" }));
app.use(morgan('tiny'), (req: Request, res: Response, next: NextFunction) => { console.log(req.clientIp); next(); });

/* Routers */
app.use(b_r, express.static('public')); // static files
//

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    res.status(400).end();
});

const listener = app.listen(process.argv[0] ? parseInt(process.argv[0]) : 4143, 'localhost', () => {
    console.log("Server started ::" + (process.argv[0] ?? 4143));
});

process.stdout.write(
    String.fromCharCode(27) + ']0;' + "Getarf CDN" + String.fromCharCode(7)
);