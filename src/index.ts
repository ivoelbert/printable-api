import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as cors from 'cors';
import * as compression from 'compression';
import printables from './printables/router';

dotenv.config();

const buildApp = (): express.Express => {
    // Our Express APP config
    const app: express.Express = express();
    app.set('port', process.env.PORT || 3002);
    app.set('trust proxy', '127.0.0.1');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json({ limit: '20mb' }));

    app.use(cors());
    app.use(compression());

    app.use('/', printables)

    app.use('/static', express.static('public'), (_req, res) => res.status(404).send("Couldn't find that specific model :("));

    return app;
};

const start = async (): Promise<void> => {
    const app: express.Express = buildApp();

    const port: number = app.get('port');

    app.listen(port, () => {
        console.info(`API is listening on port ${port}...`);
    });
};

start();
