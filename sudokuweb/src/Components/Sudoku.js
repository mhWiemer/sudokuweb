







var sudoku = {
    sudokuValues:'123456789ABCDEFG',
    sudokuCells :[],
//    initPencil : "                      ",
    initPencil : "0000000000000000",
    id: 0,
    name: '',
    width: 0,
    height: 0,
    nNumbers: 0,
    blockWidth: 0,
    blockHeight: 0,
    timestamp: null

}


function setParameters(sudokuData, cells)
{ 	
    sudoku.name = sudokuData.name;
	sudoku.blockHeight = sudokuData.blockHeight;
	sudoku.blockWidth = sudokuData.blockWidth;
	sudoku.nNumbers = sudokuData.nNumbers;
	sudoku.height = sudokuData.height;
	sudoku.width = sudokuData.width;
    sudoku.sudokuCells = cells; //sudokuData.sudokuCells;
    
    sudoku.timestamp = (sudoku.timestamp===null) ? new Date() : new Date(sudokuData.timestamp);
//    console.log(sudoku);
}

const savePuzzle = () => {
    console.log(sudoku.name)
    try {
        if (sudoku.id === 0) {
            fetch('http://localhost:3000/save', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id: 0,
                    name: sudoku.name,
                    width: sudoku.width,
                    height: sudoku.height,
                    nNumbers: sudoku.nNumbers,
                    blockWidth: sudoku.blockWidth,
                    blockHeight: sudoku.blockHeight,
                    sudokuCells: sudoku.sudokuCells
                })
            }).then(response => response.json())
                .then(sudokuData => { sudoku.id = sudokuData[0].sudokuid; sudoku.sudokuCells = sudokuData; console.log(sudokuData) })

        }
        else {
            fetch('http://localhost:3000/update', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sudokuCells: sudoku.sudokuCells
                })
            }).then(response => response.json())
                .then(sudokuData => { console.log("") })
        }
    } catch (err) {
        console.log(err);
    }
}

const createPuzzle = (name, type, wi, hi, nN) => {
    try {
       console.log('Name =', name, 'Type = ', type)
        fetch('http://localhost:3000/create', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: name,
                type: type,
                width: wi,
                height: hi,
                nNumbers: nN
            })
        }).then(response => response.json())
            .then(sudokuData => { setParameters(sudokuData, sudokuData.sudokuCells); sudoku.id = 0; return true; })
    } catch (err) {
        console.log(err);
        return false;
    }
}


//const logList = (list) => {
//    list.map((item)=>{
//        console.log(item);
//})
//}


//const loadSudokus = () => {
//    try {
//        fetch('http://localhost:3000/list', {
//            method: 'get',
//            headers: { 'Content-Type': 'application/json' },
//        }).then(response => response.json())
//            .then(list => { console.log(list); logList(list); return list; })
//    } catch (err) {
//        console.log(err);
//        return false;
//    }
//}


function loadPuzzle(id)
{
    try {
        var address = 'http://localhost:3000/loadSudokuById/' + id;        
        fetch(address, {
            method: 'get',
            headers: { 'Content-Type': 'application/json' },
        }).then(response => response.json())
            .then(sudokuData => {
                console.log(sudokuData);
                setParameters(sudokuData, sudokuData.sudokuCells); sudoku.id = sudokuData.id;
            })
    } catch (err) {
        console.log(err);
    }
}


var cellFunctions = (function () {

function clear()
{	
	for (var i=0; i<sudoku.sudokuCells.length; i++)
	{
		if (sudoku.sudokuCells[i].fixed===false)
		{
            sudoku.sudokuCells[i].value = '0';
            sudoku.sudokuCells[i].pencil=sudoku.initPencil;
		}
	}
}
	
	
// SudokuCell functions		
function toggle(pencil, oldValue, value)
{
    
	if (oldValue !=='0' && oldValue!==value)
    {
			pencil = toggle(pencil, '0', oldValue);
		}
		
    const indx = sudoku.sudokuValues.indexOf(value);
    if (indx < 0) return pencil;
	var newChar = '1';
	if (pencil.charAt(indx)==='1')
		{
			newChar = '0';
    }    
    
    var newStr1 = pencil.substr(0, indx);
    var newStr2 = pencil.substr(indx + 1);
	var str = newStr1+newChar+newStr2;
	return str;
}
	
	function hasPencil(pencil)
	{
		return pencil.includes('1');
	}
		
	
	function setValue(sudokuCell, createMode, blockMode, value)
	{
		if (blockMode)
		{
            if (value === 'Region') {
                sudokuCell.region = (sudokuCell.region > 0) ? 0 : 1;
            }
            else if (value === 'Invalid') {
                sudokuCell.isactive = !sudokuCell.isactive;
            }
            else
				sudokuCell.blocknr=Number(value);
		}
		else if (createMode)
			{
				sudokuCell.value=value;
				sudokuCell.fixed=true;
				sudokuCell.pencil=sudoku.initPencil;
			}
			else {
            if (sudokuCell.value !== '0' || hasPencil(sudokuCell.pencil))
            {
                sudokuCell.pencil = toggle(sudokuCell.pencil, sudokuCell.value, value);

				if (hasPencil(sudokuCell.pencil))
				{ 
                    sudokuCell.value = '0';
				}
				else {
					sudokuCell.value=value;
				}
																							 
			}
			else{
				sudokuCell.value=value;
			}
		}
	}

	
	function clearValue(sudokuCell, createMode)
	{
		if (createMode || sudokuCell.fixed===false)
			{
				sudokuCell.pencil= sudoku.initPencil;
				sudokuCell.value = '0';
				sudokuCell.fixed = false;
			}					
	}
	
	return{
        sudokuCell: function (index) {
            return sudoku.sudokuCells[index];
		},		
        sudokuCells: function () {
            return sudoku.sudokuCells;
		},
		clearValue: function(index, createMode)
		{
            clearValue(sudoku.sudokuCells[index], createMode);	
		},
		setValue: function(index, createMode, blockMode, value)
		{
            setValue(sudoku.sudokuCells[index], createMode, blockMode, value);
		},
		sudokuSize: function()
        {
            return sudoku;
		},
		//sudokuSetSize:function(width, height, numbers)
		//{
		//	sudoku.width = width;
		//	sudoku.height = height;
		//	sudoku.nNumbers = numbers;
		//	initPuzzle();
		//},
		clear:function()
		{
			clear();
		}
	}
})();

module.exports = {
    sudoku,
    createPuzzle,
    savePuzzle,
    loadPuzzle,
    //loadSudokus,
    cellFunctions
};

