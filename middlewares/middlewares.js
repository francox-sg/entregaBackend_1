export const validarNewProduct = (req, res, next)=>{
    

    const {title, description, code, price, status, stock, category} = req.body;
    const noExistencia = title=== undefined || description=== undefined || code=== undefined || price=== undefined || status=== undefined || stock=== undefined || category=== undefined;      
    if (noExistencia){
        res.status(404).send("Los campos minimos son: title, description, code, price, status, stock, category")
        return
    }

    const tipo = (typeof title ==="string") && (typeof description ==="string") && (typeof code ==="string") && (typeof price ==="number") && (typeof status ==="boolean") && (typeof stock ==="number") && (typeof category ==="string")

    if(!tipo){
        res.status(404).send("Los tipos no son correctos: title=[string], description=[string], code=[string], price=[number], status=[boolean], stock=[number], category=[string]")
        return
    }

    
    next();
    
}
