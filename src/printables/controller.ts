import { Request, Response } from 'express-serve-static-core';
import { promises as promiseFs, Dirent } from 'fs';

type Printable = {
    name: string;
};
type PrintableData = {
    printables: Printable[];
};

export const listModels = async (req: Request, res: Response) => {
    const files: Dirent[] = await promiseFs.readdir('public', { withFileTypes: true });

    const listData: PrintableData = {
        printables: files.filter((dirent: Dirent) => dirent.isDirectory()).map((dirent: Dirent) => ({ name: dirent.name })),
    };

    res.status(200).send(listData);
};
