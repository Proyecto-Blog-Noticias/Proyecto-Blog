import jwt from 'jsonwebtoken';
import  'dotenv/config';

export default function authMiddleware (request, response, next) {
    try {
        const [ method, token ] = request.headers.authorization.split(" ")
        
        const validAuth = jwt.verify(token, process.env.TOKEN_KEY)
        //const { username } = jwt.decode(token)
        //res.locals["username"] = username // Paso el username para uso en los controllers

        const decodedToken = jwt.decode(token)
        console.log(decodedToken)

        next()                      

    } catch (err) {
        response.sendStatus(401).send("Token no válido")
    }
}

