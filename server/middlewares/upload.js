import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import path from "path"
const storage=multer.diskStorage({
    destination:"uploads/",
    filename:(req,file,callback)=>{
        const randomText=uuidv4();
        const filename=randomText;
        const ext=path.extname(file.originalname);
        callback(null,filename+ext);
    }
})
const upload=multer({storage})
export default upload