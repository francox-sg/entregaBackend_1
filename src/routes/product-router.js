import { Router } from 'express'; //Punto de entrada de Router de Express
import {ProductMgr} from '../../productManager/productManager.js'
import { validarNewProduct} from '../../middlewares/middlewares.js';
import { validarPut } from '../../middlewares/middlewares.js';
import { socketServer } from '../../serverExpress.js';

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
    
    //const newProduct = req.body;

    //Prevengo que no se agreguen campos adicionales si vienen por req
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;


    let newProductValues = {}
    if(title != undefined)         {newProductValues["title"]       = title}
    if(description != undefined)   {newProductValues["description"] = description}
    if(code != undefined)          {newProductValues["code"]        = code}
    if(price != undefined)         {newProductValues["price"]       = price}
    if(status != undefined)        {newProductValues["status"]      = status}
    if(stock != undefined)         {newProductValues["stock"]       = stock}
    if(category != undefined)      {newProductValues["category"]    = category}
    if(thumbnails != undefined)      {newProductValues["thumbnails"]    = thumbnails}


    try{
        
        res.status(200).json( await ProductMgr.addProduct(newProductValues))
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }

    //Actualizacion de socket ante cambio por Http
    const socketProducts =  await ProductMgr.getProducts()
    socketServer.emit('getProducts', socketProducts)

})

//Actualizar Producto
router.put('/:pid', validarPut, async(req, res)=>{
    const {pid} = req.params
    
    //Prevengo que no se agreguen campos adicionales si vienen por req
    const {title, description, code, price, status, stock, category, thumbnails} = req.body;


    let newProductValues = {}
    if(title != undefined)         {newProductValues["title"]       = title}
    if(description != undefined)   {newProductValues["description"] = description}
    if(code != undefined)          {newProductValues["code"]        = code}
    if(price != undefined)         {newProductValues["price"]       = price}
    if(status != undefined)        {newProductValues["status"]      = status}
    if(stock != undefined)         {newProductValues["stock"]       = stock}
    if(category != undefined)      {newProductValues["category"]    = category}
    if(thumbnails != undefined)      {newProductValues["thumbnails"]    = thumbnails}


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

    //Actualizacion de socket ante cambio por Http
    const socketProducts =  await ProductMgr.getProducts()
    socketServer.emit('getProducts', socketProducts)
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

    //Actualizacion de socket ante cambio por Http
    const socketProducts =  await ProductMgr.getProducts()
    socketServer.emit('getProducts', socketProducts)
})

export default router




