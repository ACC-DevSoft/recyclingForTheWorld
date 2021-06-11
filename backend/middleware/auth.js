// importar modulos
const jwt = require("jsonwebtoken");

// logica 
const auth = (req, res, next)=>{
    //revisar el header 
    let jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(401).send({Message: "Authorization declined: there is no token"});
    // separar el jwt del header 
   
    jwtToken  = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(401).send({Message: "Authorization declined: there is no token"});
    // verificar token y capturar errores
    try {
        const payload = jwt.verify(jwtToken, process.env.SECRET_kEY_JWT);
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).send({Message: "Authorization declined: invalid token"});
    }
}

// exportar modulo
module.exports = auth;