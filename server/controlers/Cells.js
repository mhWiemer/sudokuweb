const getCells = (req, res, db) => {
    const { sudokuid } = req.params;
    return db.select('*').from('cells').where({sudokuid:sudokuid}).then(cells => {
			res.json(cells)	
		})
		.catch(err => res.status(400).json(err))
}


module.exports = {
	getCells: getCells
};
