const tokenizer = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.TOKEN_SECRET;
const expiration = process.env.TOKEN_EXPIRATION;


// TOKEN_SECRET_CHECK
if(process.env.TOKEN_SECRET && process.env.TOKEN_SECRET.length > 3){
  console.log("VALID TOKEN_SECRET");
}
else{
  console.log("MISSING TOKEN_SECRET");
}

module.exports = { 
  contextTokenizer: ({request: req, contextValue}) => {
    // // console.log(req.body);
    const header = req.http.headers.get('authorization') || req.http.headers.get('Authorization');
    let token = req.http.body.token || header;

    if(header) {
      token = token.split(' ').pop().trim();
    }
    if(!token){
      return false;
    }

    try{
      // checks token signature
      const {data} = tokenizer.verify(token, secret, { maxAge: expiration });
      if(data){
        contextValue.user = data;
      }
      return data;
    }catch(err){
      console.log(err);
      console.log("contextTokenizer: invalid token");
    }

    return false;
  },
  signToken: ({name, email, _id}) => {
    return tokenizer.sign({ data: { name, email, _id } }, secret, {expiresIn: expiration});
  }
};