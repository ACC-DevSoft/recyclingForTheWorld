// importar modulos
const jwt = require("jsonwebtoken");

// logica 
const auth = (req, res, next)=>{
    //revisar el header 
    let jwtToken = req.header("Authorization");
    if(!jwtToken) return res.status(401).send({Message: "Autorizacion rechazada: no hay token"});
    // separar el jwt del header 
    jwtToken  = jwtToken.split(" ")[1];
    if(!jwtToken) return res.status(401).send({Message: "Autorizacion rechazada: no hay token"});
    // verificar token y capturar errores
    try {
        const payload = jwt.verify(jwtToken, "reciclerJWT");
        req.user = payload;
        next();
    } catch (error) {
        return res.status(401).send({Message: "Autorizacion rechazada: token no valido"});
    }
}

// exportar modulo
module.exports = auth;