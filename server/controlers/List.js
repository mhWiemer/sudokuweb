const handleList = (req, res, db) => {
    const { istemplate } = req.params;    
    return db.select('*').from('sudoku').where('istemplate', istemplate).then(list => {
        res.json(list); console.log(list);
        })
            .catch(err => res.status(400).json('unable to get list of sudokus'))
}

module.exports = {
	handleList: handleList
};