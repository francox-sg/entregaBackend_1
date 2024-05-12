import { Router } from 'express'; //Punto de entrada de Router de Express
import {ProductMgr} from '../../productManager/productManager.js'



const router = Router();

//Devolver todos los Productos
router.get('/', async(req, res)=>{
    try{
        res.json( await ProductMgr.getProducts())
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

// Devolver Producto por ID
router.get('/:pid', async(req, res)=>{
    const {pid} = req.params;
    try{
        const product = await ProductMgr.getProductById(pid);
        if(product != -1){
            res.json( product)
        }else{
            res.send("El Producto No Existe")
        }
        
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//Agregar Producto
router.post('/', async(req, res)=>{
    
    const newProduct = req.body;
    
    try{
        
        res.json( await ProductMgr.addProduct(newProduct))
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//Actualizar Producto
router.put('/:pid', async(req, res)=>{
    const {pid} = req.params
    const newProductValues = req.body;
    try{
        const productoActualizado = await ProductMgr.updateProduct(pid, newProductValues)
        if(productoActualizado != -1){
            res.json(productoActualizado)
        }else{
            res.send("El Producto No Existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

//Borrar Producto
router.delete('/:pid', async(req, res)=>{
    const {pid} = req.params
    
    try{
        const status = await ProductMgr.deleteProduct(pid)
        if (status !=-1){
            res.json("Producto Borrado Con Exito")
        }else{
            res.send("El Producto No Existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

export default router




