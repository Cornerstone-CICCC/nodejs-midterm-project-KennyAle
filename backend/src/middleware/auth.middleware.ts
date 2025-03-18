import { Request, Response, NextFunction } from 'express'

export const checkLoggedIn = async (req: Request, res: Response, next: NextFunction) => {
  if (req.session && req.session.isLoggedIn) {
    next()
    return
  }
  res.status(403).json({ message: "You need to be logged in!" })
}