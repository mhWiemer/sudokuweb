import React, {Component} from 'react';
import Cell from './Cell.js';
import './Grid.css';
import { cellFunctions } from '../Sudoku.js';


class Grid extends Component{

	
	
	
		render(){
		const {clickedValue, selectedCell, onCellClicked, sudoku, blockMode} = this.props;
		const width=sudoku.width;
		const height = sudoku.height;
		let stackW = [];
		let stackH = [];
		for (let i=0; i<width; i++)
			stackW.push(i);
		for (let i=0; i<height; i++)
            stackH.push(i);
        
			
		let grid = stackH.map((itemi, i) => {
					return stackW.map((itemj, j) => {
                        let cellNumber = j + i * width;
                        const blocknr = cellFunctions.sudokuCell(cellNumber).blocknr;
						let leftB = (j===0 && blocknr!==0) ? '3px solid black' : (blocknr!==0) ? '' : '3px solid #fff';
                        let rightB = (j === width - 1 || blocknr !== cellFunctions.sudokuCell(cellNumber+1).blocknr) ? '3px solid black' : (blocknr!==0)?'2px solid #aaa' : '3px solid #fff';
                        let topB = (i === 0 && blocknr !== 0) ? '3px solid black' : (blocknr!==0) ? '': '3px solid #fff';

                        let bottomB = (i === height - 1 && blocknr === 0) ? '3px solid #fff' : (i === height - 1 || cellFunctions.sudokuCell(cellNumber).blocknr !== cellFunctions.sudokuCell(cellNumber+width).blocknr) ? '3px solid black' : (blocknr!==0)?'2px solid #aaa': '3px solid #fff';
						
						let style = {
							gridColumn: j+1,
							gridRow: i+1,
							borderLeft: leftB,
							borderRight: rightB,
							borderTop: topB,
							borderBottom: bottomB
						}
						return (
							<div 	style={style} key={cellNumber}>
								<Cell 
										clickedValue = {clickedValue}
                                        sudokuCell={cellFunctions.sudokuCell(cellNumber)}
										selectedCell={selectedCell} 
										onCellClicked = {onCellClicked}
										cellNumber ={cellNumber} 
										blockMode = {blockMode}
									/>						
								</div>
						);
					})
				})
			let gridStyle = {
					gridTemplateColumns:`repeat(${width}, 1fr)`,
					gridTemplateRows: `repeat(${height}, 1fr)`
			}
			return (
				<div className='sudokuGrid' style={gridStyle}>
					{grid}
				</div>
			)
		}
}

export default Grid;