import React from 'react';
import './LoadForm.css';
//import { loadSudokus } from '../Sudoku';


class LoadForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        sudokuId: 0,
        options: []
		};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  

  handleChange(event) {      
      let value = Number(event.target.value);          
      this.setState({ sudokuId: value });
		
  }

  handleSubmit(event) {		      
      event.preventDefault();
      this.props.finished(this.state.sudokuId);
  }

  componentDidUpdate(prevProps, prevState) {
      if (prevProps.active !== this.props.active && this.props.active===true) {
          try {
              fetch('http://localhost:3000/list/false', {
                  method: 'get',
                  headers: { 'Content-Type': 'application/json' },
              }).then(response => response.json())
                  .then(list => { this.setState({ options: list });})
          } catch (err) {
              this.setState({ options: [] });
          }

      }
  }

  getName(item) {
      const createDate = new Date(item.timestamp);
      return createDate.toLocaleDateString() + ' ' + item.name;
  }


  render(props) {
      
      if (!this.state.options===[]) {
          return <h1>Loading</h1>
      }
      else {
          return (
              <form onSubmit={this.handleSubmit} className='f6'>
                  <h3>Load</h3>
                  <div className='Loader' >
                      <div className='FirstColumn'> 	SudokuId </div>
                      <label className='SecondColumn'>
                          <input type='number' name='sudokuId' onChange={this.handleChange} />
                      </label>
                      <div className='FirstColumn'> 	Selecteer </div>
                      <label className='SecondColumn'>
                          <select onChange={this.handleChange}>
                              {
                                  this.state.options.map((item, index) => {
                                      return <option key={index} value={item.id} > { this.getName(item) }</option>
                                     
                                      
                                  })
                              }
                          </select>
                      </label>

                  </div>
                  <input className="f6 link dim br2 ba bw1 ph3 pv1 mb3 dib dark-green" type="submit" value="Laden" />
              </form>
          );
      }
  }
}
export default LoadForm;