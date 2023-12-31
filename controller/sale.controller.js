const saleService = require("../service/Sale.service");

// get all sale
async function getAllSale(req, res, next) {
    try {
        let sales = await saleService.getAllSale();
        if (sales) {
            res.status(200).json(sales);
        } else {
            res.status(400).json({message: "Sale not found"});
        }
    } catch (error) {
        res.status(400).json({message: `Sale not found`});
    }
}

// get sale by id
async function getSaleByID(req, res, next) {
    let id = req.params.id;

    try {
        let sale = await saleService.getSaleByID(id);
        if (!sale) {
            res.status(400).json({message: `Sale ID :${id} not found`});
        } else {
            res.status(200).json(sale);
        }
    } catch (error) {
        res.status(400).json({message: `Sale ID :${id} not found`});
    }
}

// create sale
async function createSale(req, res, next) {
    let body = req.body;
    try {
        let sale = await saleService.createSale(body);
        if (!sale) {
            res.status(400).json({message: `Can't save sale`});
        } else {
            res.status(201).json(sale);
        }
    } catch (error) {
        res.status(400).json({message: `Can't save sale`});
    }
}

module.exports = {
    getAllSale,
    getSaleByID,
    createSale,
}