import { Router } from "express";
import { CartMgr } from "../../cartManager/cartManager.js";
import { ProductMgr } from "../../productManager/productManager.js";

const router = Router();

//Agregar Cart
router.post('/', async (req, res)=>{
    try{
        res.status(200).json(await CartMgr.addCart())
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }

})

//Devolver Cart por ID
router.get('/:cid', async (req, res)=>{
    const {cid} = req.params;

    try{
        const cart = await CartMgr.getCartProductsById(cid)
        if(cart != -1){
            res.status(200).json(cart)
        }else{
            res.status(404).send("No existe el cart")
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }

})

//Agregar Producto por ID a Cart por ID
router.post('/:cid/product/:pid', async (req, res)=>{
    const {cid, pid} = req.params;
    
    try{
        const product = await ProductMgr.getProductById(pid);
        if(product === -1){
            res.status(404).send("El producto no existe")
        }else{
            const cart = await CartMgr.addProductToCart(cid, pid)
            if(cart != -1){
                res.status(200).json(cart)
            }else{
                res.status(404).send("El cart no existe")
            }
        }
    }
    catch(error){
        res.status(404).json({msj:"error"})
    }

})






export default router;