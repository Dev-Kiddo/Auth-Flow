import { Request, Response, NextFunction } from "express";

type AsyncRequestHandler = (req: Request, res: Response, next: NextFunction) => Promise<any>;

function asyncHandler(handler: AsyncRequestHandler) {
  return function (request: Request, response: Response, next: NextFunction) {
    return Promise.resolve(handler).catch(next);
  };
}

export default asyncHandler;
