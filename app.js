import express from 'express';
import bodyParser from 'body-parser';
import  mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path'; // propio de nodejs 
import { fileURLToPath } from 'url'; // propio de nodejs 
import router from './src/routes/index.js';
import { authController } from './src/controllers/authController.js';
import { verifyToken } from './src/middleware/authorization.js';
import { postsController } from './src/controllers/postsController.js';


// CCONFIGURACIONES : 

// cuando se utiliza la config modules en el pacakage.json para poder usar el import
const __filename = fileURLToPath(import.meta.url) ;
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: 'cross-origin'}))
app.use(morgan('common'));
app.use(bodyParser.json({limit:'30mb', extend: true}));
app.use( bodyParser.urlencoded({limit:'30mb', extended:true}));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, 'public/assets')) ) // esto guardara las imagenes o archivos en la carpeta dada, esto luego se puede configurar para que lo guarde en la nube


/* File Storage */ 
// subida de archivos desde un formulario del front, este middleware los guardara en este caso en el file system propio. buscar en github
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb( null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    } 
})
 const upload = multer({storage}) //

/* Connect Router */

app.post('/api/auth/register', upload.single("picture"), authController.register)
app.post('/api/posts/create', verifyToken, upload.single("picture"), postsController.createPosts)


app.use('/api', router)



export default app;


