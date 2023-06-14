const db = require('../db')


const list = (req,res,next)=>{
    res.json([
      {name: 'bob',age: 18},
      {name: 'jerry',age: 19}
    ])
}

const queryAll = (req, res, next)=>{
    db.queryAll().then((row)=>{
        res.json(row)
    })
}

const login = (req, res, next)=>{
    db.login(req).then((row)=>{
        res.json(row)
    })
}

const user = (req, res, next)=>{
    res.json(db.user())
}

const cartsProductsSum = (req, res, next)=>{
    res.json(db.cartsProductsSum())
}

const getProductsIdInfo = (req, res, next)=>{
    db.getProductsIdInfo(req).then((row)=>{
        res.json(row)
    })
}

const carts = (req, res, next)=>{
    res.json(db.carts(req))
}
  
module.exports = {
    list,
    queryAll,
    login,
    user,
    cartsProductsSum,
    getProductsIdInfo,
    carts
}