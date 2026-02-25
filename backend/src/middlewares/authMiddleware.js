import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];


    if (!token) {
        return res.status(401).json({ message: "No tiene autorización" });
    }   

    try {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Autorización inválida" });
            }   

            req.user = user;
            console.log("Usuario autenticado:", user);  
            next();
        }   
    )} catch (err) {
        return res.status(500).json({ message: "Error en el servidor" });
    }
};
