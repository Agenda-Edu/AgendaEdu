// src/utils/Router.ts

import { Application, Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';

export type Handler = (req: Request, res: Response, next: NextFunction) => Promise<any> | any;

@Service()
export class Router {
    
    constructor(public app: Application, public base: string = "") { }

    public handle(handler: Handler) {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const data = await handler(req, res, next);
                if (this.isSerializable(data)) {
                    res.json(data);
                } else {
                    res.status(500).json({ error: "Internal Server Error" });
                }
            } catch (error) {
                console.error("Error in handler:", error);
                res.status(500).json({ error: "Internal Server Error" });
            }
        };
    }

    private isSerializable(obj: any): boolean {
        try {
            JSON.parse(JSON.stringify(obj));
            return true;
        } catch (error) {
            return false;
        }
    }

    public group(base: string, callback: (router: Router) => any) {
        callback(new Router(this.app, this.base + base));
        return this;
    }

    public get(path: string, handler: Handler) {
        this.app.get(this.base + path, this.handle(handler));
        return this;
    }

    public post(path: string, handler: Handler) {
        this.app.post(this.base + path, this.handle(handler));
        return this;
    }

    public put(path: string, handler: Handler) {
        this.app.put(this.base + path, this.handle(handler));
        return this;
    }

    public delete(path: string, handler: Handler) {
        this.app.delete(this.base + path, this.handle(handler));
        return this;
    }

    public patch(path: string, handler: Handler) {
        this.app.patch(this.base + path, this.handle(handler));
        return this;
    }

    public middleware(...middlewares: Handler[]) {
        this.app.use(this.base, ...middlewares);
        return this;
    }
}
