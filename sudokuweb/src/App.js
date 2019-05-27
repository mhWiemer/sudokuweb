import React, { Component } from 'react';
//import KeyHandler, {KEYPRESS} from 'react-key-handler';
import Board from './Components/Board/Board.js';
import Menu from './Components/Menu.js'
import { sudoku, createPuzzle, savePuzzle, cellFunctions, loadPuzzle} from './Components/Sudoku.js';
import Modal from './Components/UI/Modal/Modal';

import CreatorForm from './Components/Creator/CreatorForm'
import LoadForm from './Components/LoadForm/LoadForm'
import './App.css';



class App extends Component {
	constructor (){
		super();
		this.state = {
			init: true,
			createMode: true,
            creating: false,
            loading: false,
            keyValue: '',
		}
}

/*
	ComponentDidMount() {
		fetch('http://localhost:3000/list')
		.then(response =>response.json())
		.then(console.log)
	}
*/
	
	
	onMenuOptionClicked = (menu) =>
	{
		if (menu==='Create')
			this.setState({createMode: !this.state.createMode});
		if (menu==='New')
			this.setState({creating: true});
        if (menu === 'Clear')
            cellFunctions.clear();
		if (menu==='Open')
        {         
            this.setState({ loading: true });
		}
        if (menu === 'Save') {
            savePuzzle();
        }
	}
	

		// Als je naast de dialoog klikt verdwijnt deze.
    creatingFinishedHandler = (name, type, cols, rows, nNumbers) => {

//        this.setState({ creating: !(createPuzzle(cols, rows, nNumbers) === true) });
        createPuzzle(name, type, cols, rows, nNumbers);
        setTimeout(
            function () {
                this.setState({ creating: false });
            }
                .bind(this),
            1000
        );		
	}
	

    // Als je naast de dialoog klikt verdwijnt deze.
    loadingFinishedHandler = (sudokuId) => {

        //        this.setState({ creating: !(createPuzzle(cols, rows, nNumbers) === true) });
        if (sudokuId === 0) {
            this.setState({ loading: false });
            return;
        }        
        loadPuzzle(sudokuId);
        setTimeout(
            function () {
                this.setState({ loading: false });
            }
                .bind(this),
            1000
        );
    }



    componentDidMount() {

//        this.setState({ init: !(createPuzzle(9, 9, 9) === true) });
        var result = createPuzzle('Standaard', 0, 9, 9, 9);
	    setTimeout(
    	function() {
        	this.setState({init: false});
    	}
    	.bind(this),
    	1000
			);		
	}


	
	render() {		
		if (this.state.init){
			//sudoku.init();
       return <h1>Loading</h1>
		}
    else {

    return (
        <div className="App">	
		    <div className="cf ph3 pa2">
			    <Modal show={this.state.creating} 
					modalClosed={this.creatingFinishedHandler}>
					<CreatorForm finished={this.creatingFinishedHandler} />
			    </Modal>

                <Modal show={this.state.loading}
                    modalClosed={this.loadingFinishedHandler}>
                    <LoadForm finished={this.loadingFinishedHandler} active={this.state.loading}/>
                </Modal>

			    <div className="fl w-20 bg-black-05">
					<Menu createMode={this.state.createMode} 
					onMenuOptionClicked={this.onMenuOptionClicked} />						
			    </div>
				<div className="fl w-80 bg-white">
					<Board createMode={this.state.createMode}
					    keyValue={this.state.keyValue}
					    sudoku={sudoku}
					/>
				</div>
		    </div>
        </div>
    );
  }
}

}

export default App;


/*						<KeyHandler keyEventName={KEYPRESS} keyValue='1'  onKeyHandle={this.keyPressed} />
						<KeyHandler keyEventName={KEYPRESS} keyValue='2'  onKeyHandle={this.keyPressed} />
						<KeyHandler keyEventName={KEYPRESS} keyValue='3'  onKeyHandle={this.keyPressed} />
						<KeyHandler keyEventName={KEYPRESS} keyValue='4'  onKeyHandle={this.keyPressed} />
						<KeyHandler keyEventName={KEYPRESS} keyValue='5'  onKeyHandle={this.keyPressed} />
						<KeyHandler keyEventName={KEYPRESS} keyValue='6'  onKeyHandle={this.keyPressed} />
						<KeyHandler keyEventName={KEYPRESS} keyValue='7'  onKeyHandle={this.keyPressed} />
						<KeyHandler keyEventName={KEYPRESS} keyValue='8'  onKeyHandle={this.keyPressed} />
*/