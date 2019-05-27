import React, {Component} from 'react';
import Pencil from './Pencil.js';
import './Cell.css';


class Cell extends Component{
	
	onCellClicked = (e) => {
		this.props.onCellClicked(this.props.cellNumber);
	}
	
	addKeyPressed = (e) =>{
		this.props.addKeyPressed(e)
	}
	
	
	styling()
	{
		const {clickedValue, cellNumber, sudokuCell, selectedCell, blockMode} = this.props;
		if (!sudokuCell)
			 return " cellSize ";		
		const hasPencil = sudokuCell.pencil.includes('1');
		var textColor = (sudokuCell.fixed || hasPencil || blockMode ) ? " black ":" blue ";
		let cellStyle =" cellSize " + textColor;		
		if (sudokuCell.blocknr===0 || sudokuCell.isactive===false){
				cellStyle = cellStyle + "bg-white ";
		}
		else if (cellNumber===selectedCell) {
			cellStyle = cellStyle + "bg-light-blue ";
		}
		else if ( sudokuCell.value===clickedValue){
			cellStyle = cellStyle + "bg-light-green "; 							
		}
		else if (sudokuCell.region>0)
			{
				cellStyle = cellStyle + "bg-lightest-blue"
			}
		else {
				cellStyle = cellStyle + "bg-washed-green ";
		}
		return cellStyle;
	}


cellValue()
	{
		const strValues = '123456789ABCDEFG';
		const {sudokuCell, blockMode} = this.props;	
		if (!sudokuCell)
			return ['0'];		
		if (blockMode)
			return[sudokuCell.blocknr]; 
		if (sudokuCell.blocknr==='0') 
			return[' '];
		let value= sudokuCell.value; 		
		let pencilMarks = sudokuCell.pencil;
        if (pencilMarks.includes('1'))
        {
				let str = ["","",""];
				let indx = 0;
				let r=0;
				for (let i=0; i<pencilMarks.length; i++)
				{
						if (r===3){ indx++; r=0; }
						if (pencilMarks.charAt(i)==='1')
						{
								str[indx] += strValues.charAt(i) + " ";
								r++;
						}
				}
				return str;
		}				
        if (value !== '0')
			return [value];		
		return[' '];
	}

	render(){		
		const cellStyle = this.styling();		
		const cellValue = this.cellValue();		
		const hasPencils = cellValue.length>1;
		const number = cellValue[0];	
	 	return (
			<div className={cellStyle} onClick={this.onCellClicked} onKeyPress={this.addKeyPressed } >
				{ 
					hasPencils 
					?
						<Pencil cellValue = {cellValue}/>
					:
					<div className = "numberStyle" >
						{number}
					</div>
				}
			</div>
    );
	}


// werkend
/*
cellValue()
	{
		const {sudokuCell} = this.props;		
		var value= sudokuCell.value; 
		var pencilMarks = sudokuCell.pencil;
		if (pencilMarks.includes('1'))
			{
				var str = ["","",""];
				var indx = -1;
				for (var i=0; i<pencilMarks.length; i++)
					{
						if (i%3===0) indx++;
						if (pencilMarks.charAt(i)==='1')
							str[indx] += i+1 + " ";
						else str[indx] += "  ";
							
					}
				return str;
			}
		if (value>0)
			return ["",value,"" ];
		return["","",""];
			
	}
	
	render(){		
		const cellStyle = this.styling();		
		const cellValue = this.cellValue();
	 	return (
			<div className={cellStyle} onClick={this.onCellClicked}>					
					{cellValue[0]}
					<br/> {cellValue[1]} 
					<br/> {cellValue[2]}
					<br/> 
			</div>
    );
	}
*/
	


/*
	render(){		
		const cellStyle = this.styling();		
		const cellValue = this.cellValue();
		var hasPencils = cellValue.length>1;
		if (hasPencils) 
		{
			return (						
				<Pencil cellValue = {cellValue} cellStyle ={cellStyle}>
			) 
		}
	 	return (
			<div className={cellStyle} onClick={this.onCellClicked}>
					{hasPencils ? 
					}
					{celValue[0]}
					<br/> {celValue[1]} 
					<br/> {celValue[2]}
					<br/> 
			</div>
    );
	}
	
*/

	/*render(){		
		const {sudokuCell} = this.props;	
		console.log(sudokuCell);
	 	return (
			<div  onClick={this.onCellClicked}> 2
			</div>
    );
	}
*/

	/*render(){		
		const {clickedValue, cellNumber, value, selectedCell} = this.props;
		
	 	return (
			<div className="h3">
				{ cellNumber===selectedCell 
						?	<span className="bg-yellow" onClick={this.onCellClicked}>		 	
								{value} 
							</span>
					: value===clickedValue 
						? <span className="bg-blue" onClick={this.onCellClicked}>		 	
								{value}
							</span>
					: <span className= "pa3 bg-light-green" onClick={this.onCellClicked}>		 	
								{value} 
						</span>
				}
			</div>
    );
	}*/
}

export default Cell;


/*
		if (cellNumber%4===3)
			{
				cellStyle = cellStyle + " borderRight ";
			}
		if (Math.floor(cellNumber/16)%4===3)
			{
				cellStyle = cellStyle + " borderBottom ";
			}

*/