import express from 'express'

import productRouter from './src/routes/product-router.js';
import cartRouter from './src/routes/cart-router.js';

const PORT= 8080;

const app = express();

//Middlewares
app.use(express.json()) //Middleware para entender JSON que vine del Body de los req
app.use(express.urlencoded({extended:true})) //Reconoce Parametros de URL

app.listen(PORT, ()=>{console.log(`Servidor iniciado en Puerto ${PORT}`);});

//Routes
app.use('/api/products',productRouter)
app.use('/api/carts',cartRouter)

