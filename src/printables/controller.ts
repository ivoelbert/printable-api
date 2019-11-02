import { Request, Response } from 'express-serve-static-core';
import { promises as promiseFs, Dirent } from 'fs';

type Printable = {
    modelSrc: string;
    thumbSrc: string;
};
type PrintableData = {
    printables: Printable[];
};

export const listModels = async (req: Request, res: Response) => {
    const files: Dirent[] = await promiseFs.readdir('public', { withFileTypes: true });

    const listData: PrintableData = {
        printables: files
            .filter((dirent: Dirent) => dirent.isDirectory())
            .map((dirent: Dirent) => ({ modelSrc: `${dirent.name}/${dirent.name}.gltf`, thumbSrc: `${dirent.name}/${dirent.name}.jpg` })),
    };

    res.status(200).send(listData);
};
