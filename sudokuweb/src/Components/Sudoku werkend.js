


var sudoku = (function() {
	const sudokuValues='123456789ABCDEFG';
	let sudokuCells = [];
	const initPencil = "                      ";
	
	let sudokuSize = {
		id: 0,
		name: '',
		width: 0,
		height: 0,
		nNumbers: 0,
		blockWidth: 0,
		blockHeight: 0
		
	};
// Sudoku functions
/*	function setBlockSize()
	{
		sudokuSize.blockWidth=(sudokuSize.width%4===0) ?4 :3;
		sudokuSize.blockHeight=(sudokuSize.height%3===0)? 3 : 4;
		if (sudokuSize.blockHeight*sudokuSize.blockWidth!==sudokuSize.nNumbers)
			{
				sudokuSize.blockWidth=3;
				sudokuSize.blockHeight=3;
				if (sudokuSize.blockHeight*sudokuSize.blockWidth!==sudokuSize.nNumbers)
					{
						sudokuSize.blockWidth=sudokuSize.width;
						sudokuSize.blockHeight=sudokuSize.height;
					}
			}
	}
*/	
	function setParameters(sudokuData)
	{
		
		sudokuSize.blockHeight = sudokuData.blockHeight;
		sudokuSize.blockWidth = sudokuData.blockWidth;
		sudokuSize.id = sudokuData.id;
		sudokuSize.nNumbers = sudokuData.nNumbers;
		sudokuSize.height = sudokuData.height;
		sudokuSize.width = sudokuData.width;
		sudokuCells = sudokuData.sudokuCells;
		console.log(sudokuSize);
        console.log(sudokuCells);
        return sudokuSize.id;
	}
	
	function loadPuzzle(id)
	{
		if (id>0)
			{
				// load the sudoku with this ID
        }
        try {
            fetch('http://localhost:3000/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    width: 9,
                    height: 9,
                    nNumbers: 9
                })
            }).then(response => response.json())
                .then(sudokuData => { setParameters(sudokuData) })
        } catch (err) {
            console.log(err);
        }
/*		
		.then(user => {
			if (user.id){
				this.props.loadUser(user);
				this.props.onRouteChange('home');		
			}
		})	
*/		
	}
	
	function savePuzzle()
	{
		
	}
	
	function initPuzzle()
	{
		console.log("init sudoku");
        loadPuzzle(0);        

/*		
		sudokuCells = [];
		setBlockSize();
		for (let row=0; row<sudokuSize.height; row++)
		{
			for (let col=0; col<sudokuSize.width; col++)
			{
					let bw=Math.floor(col/sudokuSize.blockWidth)+1;
					let br=Math.floor(row/sudokuSize.blockHeight);					
					let blockNumber = br*(sudokuSize.width/sudokuSize.blockWidth)+bw;
					sudokuCells.push({
							id:col+sudokuSize.width*row, 
							value: 0,
							pencil: initPencil,
							fixed: false,
							blockNr: blockNumber,
							region: false
					})	
				}
		}
*/
	};

	function clear()
	{
		console.log('In function clear')
		for (var i=0; i<sudokuCells.length; i++)
		{
			if (sudokuCells[i].fixed===false)
			{
				sudokuCells[i].value=0;
				sudokuCells[i].pencil=initPencil;
			}
		}
	}
	
	
	
// SudokuCell functions		
	function toggle(pencil, oldValue, value)
	{
		if (oldValue !==0 && oldValue!==value)
			{
				pencil = toggle(pencil, 0, oldValue);
			}
		
		const indx=sudokuValues.indexOf(value);		
		
		
		var newChar = ' ';
		var newStr1 = pencil.slice(0, indx);
		var newStr2 = pencil.substr(indx+1);
		if (pencil.charAt(indx)===' ')
			{
				newChar = '1';
			}
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
			if (value==='Region'){
				sudokuCell.region=!sudokuCell.region;
			}
			else
				sudokuCell.blockNr=value;
		}
		else if (createMode)
			{
				sudokuCell.value=value;
				sudokuCell.fixed=true;
				sudokuCell.pencil=initPencil;
			}
			else {
				if (sudokuCell.value!==0 || hasPencil(sudokuCell.pencil))
					{
							sudokuCell.pencil=toggle(sudokuCell.pencil,sudokuCell.value, value);
							if (hasPencil(sudokuCell.pencil))
							{ 
								sudokuCell.value = 0;
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
				sudokuCell.pencil= initPencil;
				sudokuCell.value = 0;
				sudokuCell.fixed = false;
			}					
	}
	
	return{
		init: function()
		{
			console.log('init');
//			initPuzzle();

//			if (sudokuCells.length<1)
				initPuzzle();

		},
		sudokuCell: function(index){
			return sudokuCells[index];
		},		
		sudokuCells: function(){
			return sudokuCells;
		},
		clearValue: function(index, createMode)
		{
			clearValue(sudokuCells[index], createMode);	
		},
		setValue: function(index, createMode, blockMode, value)
		{
			setValue(sudokuCells[index], createMode, blockMode, value);
		},
		sudokuSize: function()
		{
			return sudokuSize;
		},
		sudokuSetSize:function(width, height, numbers)
		{
			sudokuSize.width = width;
			sudokuSize.height = height;
			sudokuSize.nNumbers = numbers;
			initPuzzle();
		},
		clear:function()
		{
			clear();
		}
	}
})();

module.exports={
sudoku
//initPuzzle
};
