

const Promise = require('bluebird');

/*
const updateCells = (req, res, db)=>{
	const { sudokuCells } = req.body;	
	const cellsToInsert = sudokuCells.map(cell => ({
			id: cell.id,
			sudokuid: cell.sudokuid,
			tilenr: cell.tilenr,
			blocknr: cell.blockNr,
			isactive: true,
			fixed: cell.fixed,
			region: 1,
			value: cell.value,
			solution:0,
			pencil: cell.pencil
	}))
	console.log(cellsToInsert);
	db('cells').returning('*')
	.update(sudokuCells[1].id, sudokuCells[1].value)
	.then(cells=>{
		res.json(cells);
	})
	.catch(err2 => res.status(400).json(err2));
}
*/

const updateCells = (req, res, db)=>{
	const { sudokuCells } = req.body;
	const cellsToInsert = sudokuCells.map(cell => ({
			id: cell.id,
			sudokuid: cell.sudokuid,
			tilenr: cell.tilenr,
			blocknr: cell.blocknr,
			isactive: true,
			fixed: cell.fixed,
			region: cell.region,
			value: cell.value,
			solution:0,
			pencil: cell.pencil
	}))
  db.transaction(trx => {
    let queries = cellsToInsert.map(cell =>
      db('cells')
        .where('id', cell.id)
        .update(cell)
        .transacting(trx)
    );
    return Promise.all(queries)
      .then(trx.commit)    
      .catch(trx.rollback);
  }).then(response=>{res.json(response)})
      .catch(err => { console.log(err); res.status(400).json(err) })
	
}
/*

const updateCells = (req, res, db)=>{
	const { sudokuCells } = req.body;		
	var succeeded = true;
	var nrRecordsInserted
	const resp = sudokuCells.map(cell => (
	db('cells').where({id: cell.id}).update({value: cell.value}, ['id','value'])
		.then(response =>{			
			res.json(response);})
		.catch(err=>res.status(400).json(err))
		))
}
*/
module.exports = {
	updateCells: updateCells
};