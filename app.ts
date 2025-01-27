import pjson from './package.json';

import express, { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import cors from 'cors';
import path from 'path';

const app: express.Application = express();
const b_r: string = '/v' + pjson.version;
var port = pjson.port;
for (let i = 0; i < process.argv.length; i++) {
    if (process.argv[i] == '--port')
        if (process.argv.length >= i)
            port = process.argv[i + 1];
}

app.use(cors());
app.use(requestIp.mw());
app.use(bodyParser.json({ type: "application/json" }));
app.use(morgan('tiny'), (req: Request, res: Response, next: NextFunction) => { console.log(req.clientIp); next(); });

/* Routers */
app.use(b_r, express.static('public'));
console.log(__dirname);

//

app.use('*', async (req: Request, res: Response, next: NextFunction) => {
    res.status(400).end();
});

const listener = app.listen(parseFloat(port), 'localhost', () => {
    console.log("Server started ::" + port);
});

process.stdout.write(
    String.fromCharCode(27) + ']0;' + "Getarf CDN" + String.fromCharCode(7)
);