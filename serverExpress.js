import express from 'express'
import { __dirname } from './utils.js';
import handlebars from 'express-handlebars'
import { Server, Socket } from 'socket.io';

import productRouter from './src/routes/product-router.js';
import cartRouter from './src/routes/cart-router.js';
import viewsRouter from './src/routes/views-router.js'

import { ProductMgr } from './productManager/productManager.js';


const PORT= 8080;

const app = express();

//Middlewares
app.use(express.json()) //Middleware para entender JSON que vine del Body de los req
app.use(express.urlencoded({extended:true})) //Reconoce Parametros de URL
app.use(express.static(`${__dirname}/public`))

const httpServer = app.listen(PORT, ()=>{console.log(`Servidor iniciado en Puerto ${PORT}`);});

//Routes
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)
app.use('/',viewsRouter) //Vista de Handlebars


//Handlebars
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/src/views`)
app.set('view engine', 'handlebars')


//Sockets
export const socketServer = new Server(httpServer);

//Conexion de Cliente
socketServer.on('connection', async (socket)=>{
    
    console.log("Cliente conectado: ", socket.id);

    //Desconexin de Cliente
    socket.on('disconnect', ()=>{
        console.log("Cliente desconectado: ", socket.id);
    })

    //Primera conexion
    const products = await ProductMgr.getProducts();
    socket.emit('getProducts', products)

    //Nuevo Producto desde Form
    socket.on('newProductForm', async (formProduct)=>{
        console.log(formProduct);

        await ProductMgr.addProduct(formProduct)
        const products = await ProductMgr.getProducts();
        socketServer.emit('getProducts', products)
    })

    //Borrar Producto 
    socket.on('deleteProduct', async (idToDelete)=>{
        
        console.log("Entra a Delete");
        await ProductMgr.deleteProduct(idToDelete)
        const products = await ProductMgr.getProducts();
        socketServer.emit('getProducts', products)
    })
})








