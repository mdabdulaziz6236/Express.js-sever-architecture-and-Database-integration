import type { NextFunction, Request, Response } from "express";
import fs from 'fs'



const logger = (req: Request, res: Response, next: NextFunction) => {
    const currentTime = new Date().toLocaleString();
    const log = `\n========================================
Method : ${req.method}
URL    : ${req.url}
Time   : ${currentTime}
========================================\n`;
    fs.appendFile('logger.txt', log, (error) => {
        if (error) {
            console.log(error);
        }
    });

    next();
}

export default logger