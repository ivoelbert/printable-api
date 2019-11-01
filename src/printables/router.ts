import { Router } from 'express';
import { listModels } from './controller';

const printables: Router = Router();

printables.get('/list-models', listModels);

export default printables;