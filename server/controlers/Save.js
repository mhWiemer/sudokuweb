
/*	let sudoku = {
		id: 1,
		width: 9,
		height: 9,
		nNumbers: 9,
		blockWidth: 1,
		blockHeight: 1,
		sudokuCells: []
		
		cells:
								sudokuid:1,
							tilenr:col+sudoku.width*row, 
							value: 0,
							pencil: initPencil,
							fixed: false,
							blockNr: blockNumber,
							region: false,
							solution:false						  

		
	};*/


const saveNew = (req, res, db)=>{
    const { id, name, width, height, nNumbers, blockWidth, blockHeight, sudokuCells } = req.body;	
	if (!blockHeight) {
		return res.status(400).json('incorrect form submission');
	}
		db('sudoku').returning('*')
		.insert({
			cols: width,
			rows: height,
			numbers: nNumbers,
			solution: false,
            name: name,
            timestamp: new Date()
		})
		.then(sudoku => { 
			const cellsToInsert = sudokuCells.map(cell => ({
					sudokuid: sudoku[0].id,
					tilenr: cell.tilenr,
					blocknr: cell.blocknr,
					isactive: true,
					fixed: cell.fixed,
					region: cell.region,
					value: cell.value,
					solution:0,
					pencil: cell.pencil
			}))
			db('cells').returning('*')
			.insert(cellsToInsert)
			.then(response=>{
				res.json(response);
			})
			.catch(err2 => res.status(400).json(err2));
		})
		.catch(err => res.status(400).json(err))
}

/* */

/*
const saveNew = (req, res, db)=>{
	const { id, width, height, numbers, blockWidth, blockHeight, sudokuCells } = req.body;	
	let i=0;
	if (!blockHeight) {
		return res.status(400).json('incorrect form submission');
	}
	db.transaction(trx =>{
		trx.insert({
			hor: width,
			vert: height,
			numbers: nNumbers,
			CreateDate: new Date(),
			HasSolution: false,
			Difficulty: 1,
			Solved: false,
			Type: "standard",
			Name: "TestSudoku"
		})
		.into('sudoku')
		.returning('Id')
		.then(id => {
			console.log('inserting cells');
			return trx('cells')
				.returning('*')
				.insert({
						SudokuID: id[0],
						TileNr: sudokuCells[i].tilenr,
						BlockNumber: sudokuCells[i].blockNr,
						IsActive: true,
						IsFixedValue: sudokuCells[i].fixed,
						LrOnx: sudokuCells[i].region,
						RlOnx: sudokuCells[i].region,
						Value: sudokuCells[i].value,
						Solution: 0
			})
			.then(response =>{
				console.log('second response');
				res.json(response);
			})
		})
		.then(trx.commit)
		.catch(trx.rollback)
	})	
	.catch(err => res.status(400).json(err))			
}
*/

module.exports = {
	saveNew: saveNew
};