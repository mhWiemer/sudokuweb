	
	const sudokuValues='123456789ABCDEFG';
	const initPencil = "0000000000000000";
	let sudoku = {
		id: 1,
		width: 9,
		height: 9,
		nNumbers: 9,
		blockWidth: 1,
        blockHeight: 1,
        timestamp:null,
		sudokuCells: []
	};
	
	module.exports={
		sudokuValues : sudokuValues,
		initPencil : initPencil,
		sudoku : sudoku
	};
		

