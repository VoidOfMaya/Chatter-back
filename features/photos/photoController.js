import {cloudUpload} from './cloudinary.js'
import http from 'http'
import https from 'https'
import { matchedData, validationResult } from 'express-validator';

 
async function uploadFile(req, res, next){
   //first validate and mutate data

   //handle data upload:
    console.log('multerController')
    const errors = validationResult(req);
    if(!errors.isEmpty())return res.status(400).json({errors : errors.array()})
    const data = matchedData(req);
    console.log(req.file)
    try{            
      /*const result = await cloudUpload(req.file.buffer);
      console.log('uploaded to cloudinary')
      
      //checks if cloudinary  returned the correct objects
      if(!result.secure_url){ 
         req.flash('errors','internal Error: cloudinary url faulty, try again later!' );
         return res.redirect('/')
      }
      // handles file upload from folder
      
      const id = req.body.folderId? Number(req.body.folderId) : null;

      //prisma takes a fileobj that has the following
      const fileObj ={
         userId :        req.user.id,
         originalName:   req.file.originalname,      
         fileName:       result.public_id,    
         mimeType:       req.file.mimetype,          
         size:           req.file.size,           
         path:           result.secure_url,
         folderId:       id             //implement folderid get if file is created inside a folder
      }
      await prismaAddFile(fileObj);
      console.log('added to db');*/
      
   }catch(err){
      //next(err)
      req.flash('errors', err);
      res.redirect('/')
   }
    return req.body.folderId? res.redirect(`/folders/${req.body.folderId}?`): res.redirect('/');
 }
 export{
    uploadFile,
 }