import { Router } from 'express'; //Punto de entrada de Router de Express
import {ProductMgr} from '../../productManager/productManager.js'
import { validarNewProduct} from '../../middlewares/middlewares.js';


const router = Router();

//Devolver todos los Productos
router.get('/', async(req, res)=>{
    const {limit} = req.query;
    try{
        res.status(200).json( await ProductMgr.getProducts(limit))
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
            res.status(200).json( product)
        }else{
            res.status(404).send("El Producto No Existe")
        }
        
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})



//Agregar Producto
router.post('/', validarNewProduct, async(req, res)=>{
    
    const newProduct = req.body;
    
    try{
        
        res.status(200).json( await ProductMgr.addProduct(newProduct))
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
            res.status(200).json(productoActualizado)
        }else{
            res.status(404).send("El Producto No Existe")
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
            res.status(200).json("Producto Borrado Con Exito")
        }else{
            res.status(404).send("El Producto No Existe")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }
})

export default router




