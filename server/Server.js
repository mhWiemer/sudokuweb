// Gebruik internet
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
/*
const knex = require('knex');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'sa',
    database : 'smart-brain'
  }
});
*/

const app = express();
app.use(bodyParser.json());
app.use(cors());
const knex = require('knex');

const list = require('./controlers/List');
const cells = require('./controlers/Cells');
const newSudoku = require('./controlers/Create');
const save = require('./controlers/Save');
const update = require('./controlers/Update');

const db = knex({
	  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'sa',
    database : 'Sudoku'
  }
})


app.get('/list/:istemplate', (req, res) => { list.handleList(req, res, db) });

app.get('/cells/:sudokuid', (req, res) => { console.log('app get works'); console.log(req.params); cells.getCells(req, res, db) });

app.post('/save', (req, res) => {
	save.saveNew(req,res,db)
});
app.post('/create', (req,res) =>{
    newSudoku.createSudoku(req,res, db)
});
app.post('/update', (req, res) => {    
	update.updateCells(req,res,db)
});

app.get('/loadSudokuById/:id', (req, res) => {
    newSudoku.loadSudokuById(req, res, db)

});

	
app.get('/', (req, res) => {
	const sudoku = {
		name: 'myFirstSudoku',
		createDate: '20180513',
		solved: false,
		hor: 4,
		vert: 4,
		numbers: 4		
	}
	res.send(sudoku);
});

/*
app.get('/cells', (req,res)=>{
		sudokuCells = [];
		for (let row=0; row<4; row++)
		{
			for (let col=0; col<4; col++)
			{
					let bw=Math.floor(col/2)+1;
					let br=Math.floor(row/2);					
					let blockNumber = br*2+bw;
					sudokuCells.push({
							id:col+4*row, 
							value: 0,
							pencil: "    ",
							fixed: false,
							blockNr: blockNumber,
							region: false
					})	
				}
		}
	res.send(sudokuCells);
});
*/




app.listen(3000);








/*
Dit is de node.js manier maar beter is om de express manier te gebruiken.
const http = require('http');
const server = http.createServer((request, response)=>{
	const user = {
		name: 'John',
		hobby: 'Skating'
	}
	
	response.setHeader('Content-Type', 'application/json');
	response.end(JSON.stringify(user));

		console.log('I hear you');
})

server.listen(3000);*/