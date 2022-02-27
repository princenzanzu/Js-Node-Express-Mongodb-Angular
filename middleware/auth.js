
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
    const userId = decodedToken.userId;
    //req.userId = userId;
    // En plus mieux on a: 
    req.auth = {userId: userId};

    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};
/*
export default (req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = verify(token,'RANDOM_TOKEN_SECRET');
        const userId= decodedToken.userId;
        if(req.body.userId && req.body.userId !== userId){
            throw 'User ID non valable';
        }else {
            next();
        }
    }catch (error){
        res.status(401).json({error: error | 'Requête non authentifiée !'});
    }
};*/