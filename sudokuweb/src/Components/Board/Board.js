import React from 'react';

import Buttons from '../Buttons/Buttons.js';
import Grid from './Grid.js';
import { cellFunctions } from '../Sudoku.js';





const initialState = {
	selectedCell : 0,
	clickedValue : '',
	createMode : false,
	blockMode : false
}

class Board extends React.Component {
	constructor (props){
		super(props);
		this.state = initialState;	
	}
	
	onButtonClicked = (button) =>
	{
		this.setState({clickedValue: button});		
		const {createMode} = this.props;
		if (this.state.selectedCell!==-1)
		{
			var sudoku = this.props.sudoku;
			if (button==='Clear')
            {
                    cellFunctions.clearValue(this.state.selectedCell, createMode);
					return;
			}
			else if (button==='Block')
			{						
						this.setState({blockMode:this.state.blockMode===false});
			}
			else {
                cellFunctions.setValue(this.state.selectedCell, createMode, this.state.blockMode,button)
			}
		}
	}
	
	onCellClicked = (cellNumber) =>{
		const {sudoku} = this.props;
        let sudokuCell = cellFunctions.sudokuCell(cellNumber);
		if (sudokuCell.value!=='0')
			{
				this.setState({clickedValue: sudokuCell.value});
				
			}
		this.setState({selectedCell: cellNumber});
	}
	
	handleKeyValue =(keyValue)=>{
		const{sudoku, createMode} = this.props;
		if (this.state.selectedCell!==-1)
		{
			this.setState({clickedValue: keyValue});		
            cellFunctions.setValue(this.state.selectedCell, createMode, this.state.blockMode, keyValue);
		}
	}
	
keyPressed = (e) =>
	{
		const validKeys='0123456789ABCDEFGabcdefg';	
		let key = e.key;
		if (validKeys.includes(key))	
		{
            if (validKeys.indexOf(key) > 16) {
                key = key.toUpperCase();
			}
			this.handleKeyValue(key);
		}
	}


componentWillMount(){
	document.addEventListener("keyPress", this.keyPressed, false);
}

componentWillUnMount(){
	document.removeEventListener("keyPress", this.keyPressed, false);
}


	
	render() {
        const { sudoku, createMode } = this.props;
        const nButtons = sudoku.nNumbers;
    return (
      <div tabIndex="0" onKeyDown={this.keyPressed}>	
					<div className="bg-grey">
							<Grid 
									onCellClicked={this.onCellClicked} 
									clickedValue ={this.state.clickedValue}
									selectedCell = {this.state.selectedCell}
									blockMode = {this.state.blockMode}
									sudoku = {sudoku}

							/>
							<Buttons 
									createMode={createMode} 
									blockMode = {this.state.blockMode}
									nButtons = {nButtons}
									onButtonClicked={this.onButtonClicked}/>			
					</div>
      </div>
    );
  }
	
}

export default Board;