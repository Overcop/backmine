export const authMiddleware = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader) {
        return res.status(401).json({ status: 'error', message: 'No token provided' });
      }
  
      const token = authHeader.split(' ')[1];
      if (!token) {
        return res.status(401).json({ status: 'error', message: 'Invalid token format' });
      }
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await tables.users.findById(decoded.userId);
      if (!user) {
        return res.status(401).json({ status: 'error', message: 'User not found' });
      }
  
      req.user = user;
  
      next();
    } catch (error) {
      if (error instanceof jwt.JsonWebTokenError) {
        return res.status(401).json({ status: 'error', message: 'Invalid token' });
      }
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ status: 'error', message: 'Token expired' });
      }
      console.error('Authentication error:', error);
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  };