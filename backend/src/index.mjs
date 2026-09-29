import express from "express";
import cors from 'cors';
import { config } from "dotenv"
import { getOneNewsController, getAllNewsController, postNewsController, putNewsController, deleteNewsController } from "./controllers/newsController.mjs";
import { userRegisterController, userLoginController, getAllUsersController, deleteUserController } from "./controllers/usersController.mjs";
import authMiddleware from "./middleware/authMiddleware.mjs"
//import { validateUserRegister } from "./middleware/userValidatorSchema.mjs";
import multer from "multer";


const PATH_PREFIX = "/api/v0.0"
if ( process.env.NODE_ENV != "production" ) config()

const app = express();
app.use(cors());


const uploader = multer({dest: './imgs'})

try {
    app.use(express.json())  
    app.use('/imgs/', express.static('./imgs/'));
    app.use('/', express.static('../frontend/blog/build/'));
    //app.use("/", express.static("../frontend/blog/build/", {index: "index.html"}))

    // EndPoints para /news/

    app.get(PATH_PREFIX+"/news/:id_news", getOneNewsController)

    app.get(PATH_PREFIX+"/news/", getAllNewsController)

    app.post(PATH_PREFIX+"/news/", authMiddleware, uploader.single('src') ,postNewsController);

    app.put(PATH_PREFIX+"/news/id_news", putNewsController);

    app.delete(PATH_PREFIX+"/news/:id_news", deleteNewsController);


    // EndPoints para /users/

    app.get(PATH_PREFIX+"/users/", getAllUsersController);

    app.post(PATH_PREFIX+"/users/register", userRegisterController);

    app.post(PATH_PREFIX+"/users/login", userLoginController);

    app.delete(PATH_PREFIX+"/users/id_user", deleteUserController);
    
   

    app.listen(process.env.PORT,()=>{
        console.log(`Servidor Express funcionando en puerto ${process.env.PORT}`);
    });

} catch {
    console.log(`Algo ha funcionado mal...`);
    response.status(500).send(`<b>Algo ha funcionado mal...</b>`); 
}    