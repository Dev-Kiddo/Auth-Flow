declare global {
  namespace Express {
    interface Request {
      user: UserPayload | null;
    }
  }
}

export interface UserPayload {
  id: string;
  role: string;
}
