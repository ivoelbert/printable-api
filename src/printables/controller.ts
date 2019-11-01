import { Request, Response } from 'express-serve-static-core';
import { promises as promiseFs } from 'fs';

export const listModels = async (req: Request, res: Response) => {
    const files: string[] = await promiseFs.readdir('public');

    const listData = {
        printables: files.filter((fileName: string) => fileName.endsWith('.gltf')),
    };

    res.status(200).send(listData);
};
