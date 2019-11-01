import { Request, Response } from 'express-serve-static-core';
import { promises as promiseFs, Dirent } from 'fs';

type PrintableData = {
    printables: string[];
};

export const listModels = async (req: Request, res: Response) => {
    const files: Dirent[] = await promiseFs.readdir('public', { withFileTypes: true });

    const listData: PrintableData = {
        printables: files.filter((dirent: Dirent) => dirent.isDirectory()).map((dirent: Dirent) => `${dirent.name}.gltf`),
    };

    res.status(200).send(listData);
};
