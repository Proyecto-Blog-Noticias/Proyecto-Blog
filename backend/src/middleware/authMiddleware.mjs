import jwt from 'jsonwebtoken';
import 'dotenv/config';

// 1. Middleware general de autenticación
export default function authMiddleware(request, response, next) {
    try {
        const authHeader = request.headers.authorization;
        if (!authHeader) {
            return response.status(401).json({ message: "No se proporcionó un token de autenticación" });
        }

        const [method, token] = authHeader.split(" ");
        
        if (method !== "Bearer" || !token) {
            return response.status(401).json({ message: "Formato de token inválido" });
        }

        // Verificamos y decodificamos el token de forma segura
        const decodedToken = jwt.verify(token, process.env.TOKEN_KEY);
        
        // Inyectamos los datos del usuario en el objeto request para que estén 
        // disponibles en los siguientes middlewares y controladores (por ejemplo: request.user.role)
        request.user = decodedToken; 

        next();                      

    } catch (err) {
        return response.status(401).json({ message: "Token no válido o expirado" });
    }
}

// 2. Nuevo middleware exclusivo para el rol de Administrador
export function isAdmin(request, response, next) {
    // Verificamos si el middleware anterior ya inyectó al usuario y si su rol es admin
    if (!request.user || request.user.role !== 'admin') {
        return response.status(403).json({ message: "Acceso denegado: Se requieren permisos de Administrador" });
    }
    
    next();
}
