	
var cSudoku = require('../../SudokuShared/SudokuConstants.js');
var {initPencil, sudoku} = cSudoku;
								
/*	const sudokuValues='123456789ABCDEFG';
	const initPencil = "                      ";
	let sudoku = {
		id: 1,
		width: 9,
		height: 9,
		nNumbers: 9,
		blockWidth: 1,
		blockHeight: 1,
		sudokuCells: []
	};*/




const loadSudokuById = (req, res, db) => {
    const { id } = req.params;
    db.select('*').from('sudoku')
        .where('id', '=', id)
        .then(data => {
            sudoku.name = data[0].name;
            sudoku.width = data[0].cols;
            sudoku.height = data[0].rows;
            sudoku.nNumbers = data[0].numbers;
            sudoku.id = id;
            sudoku.timestamp = data[0].timestamp;
            setBlockSize();
            return db.select('*').from('cells').where('sudokuid', '=', id).orderBy('tilenr')
                .then(cells => {
                    sudoku.sudokuCells = cells;
                    res.json(sudoku);
                })
                .catch(err => res.status(400).json('unable to get cells'))
        })
        .catch(err => res.status(400).json('unable to get sudoku'))

}

function CreateSudokuFromId(name, id, res, db)
{
    db.select('*').from('sudoku')
        .where('id', '=', id)
        .then(data => {
            sudoku.name = name;
            sudoku.width = data[0].cols;
            sudoku.height = data[0].rows;
            sudoku.nNumbers = data[0].numbers;
            sudoku.id = 0;
            setBlockSize();
            return db.select('*').from('cells').where('sudokuid', '=', id).orderBy('tilenr')
                .then(cells => {
                    sudoku.sudokuCells = cells;
                    res.json(sudoku);
                })
                .catch(err => res.status(400).json('unable to get cells'))
        })
        .catch(err => res.status(400).json('unable to get sudoku'))
}

//    return db.select('*').from('sudoku').where({ id: id }).then(list => {
//        res.json(list[0]).then(sudoku => {
//            sudoku.width = width;
//            sudoku.height = height;
//            sudoku.nNumbers = nNumbers;
//            initPuzzle();
//        })
//    })
//        .catch(err => res.status(400).json('unable to get this sudoku'))
//}



// Creates new sudoku grid with empty cells based on width, hight of total sudoku and the number of different values to fill in. 
// width * height must be dividable by the number of different values and width and height must be smaller than 16.
//     this.options = ['Standard', 'X-Sudoku 9x9', 'VK-zaterdag', 'Triathlon', 'Twins 9x9', 'Samurai', 'Chaos 9x9', 'Super 16x16'];

const createSudoku = (req, res, db) => {
    const { name, type, width, height, nNumbers } = req.body;	
    if (type !== 0) {
        return CreateSudokuFromId(name, type, res, db);
    }

    //if (type === 'Twins 9x9') {
    //    return CreateSudokuFromId(name, 32, res, db);
    //}
    //if (type === 'Samurai') {
    //    return CreateSudokuFromId(name, 33, res, db);
    //}
    //if (type === 'X-Sudoku 9x9')
    //{
    //    return CreateSudokuFromId(name, 36, res, db);
    //}
    else {
        if (!width || !height || !nNumbers || (width > 21 || height > 21 || nNumbers > 16)) {
            return res.status(400).json('incorrect numbers');
        }
        sudoku.width = width;
        sudoku.height = height;
        sudoku.nNumbers = nNumbers;
        sudoku.name = name;
        initPuzzle()
        return res.json(sudoku);
    }
}



// Sudoku functions
	function setBlockSize()
	{
		sudoku.blockWidth=(sudoku.width%4===0) ?4 :3;
        sudoku.blockHeight = (sudoku.height % 3 === 0) ? 3 : 4;
        
		if (sudoku.blockHeight*sudoku.blockWidth!==sudoku.nNumbers)
			{
				sudoku.blockWidth=3;
				sudoku.blockHeight=3;
                if (sudoku.blockHeight * sudoku.blockWidth !== sudoku.nNumbers)
					{
						sudoku.blockWidth=sudoku.width;
                        sudoku.blockHeight = sudoku.height;
					}
        }
	}

	function initPuzzle()
	{
		sudoku.sudokuCells = [];
        setBlockSize();
		for (let row=0; row<sudoku.height; row++)
		{
			for (let col=0; col<sudoku.width; col++)
			{
					let bw=Math.floor(col/sudoku.blockWidth)+1;
					let br=Math.floor(row/sudoku.blockHeight);					
					let blockNumber = br*(sudoku.width/sudoku.blockWidth)+bw;
					sudoku.sudokuCells.push({		
							sudokuid:1,
							tilenr:col+sudoku.width*row, 
							value: '0',
							pencil: initPencil,
							fixed: false,
							blocknr: blockNumber,
                            region: 0,
                            isactive: true,
							solution:false						  
					})	
				}
        }
	};

module.exports={
    createSudoku: createSudoku,
    loadSudokuById: loadSudokuById
};

