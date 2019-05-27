import React from 'react';
import './CreatorForm.css';


class CreatorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        name: "",
        type: '',
		width: 9,
		height:9,
        nNumbers: 9,
        options: []
    };

    //this.options = ['Standard', 'X-Sudoku 9x9', 'VK-zaterdag', 'Triathlon', 'Twins 9x9', 'Samurai', 'Chaos 9x9', 'Super 16x16'];

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {      
      if (event.target.name === 'name')
          this.setState({ [event.target.name]: event.target.value });
      else {
          let value = Number(event.target.value);
          this.setState({ [event.target.name]: value });
      }
		
  }

  handleSubmit(event) {		
		
      event.preventDefault();      
      this.props.finished(this.state.name, this.state.type, this.state.width, this.state.height, this.state.nNumbers);
  }

  componentDidMount() {
      try {
          fetch('http://localhost:3000/list/true', {
              method: 'get',
              headers: { 'Content-Type': 'application/json' },
          }).then(response => response.json())
              .then(list => { this.setState({ options: list }); })
      } catch (err) {
          this.setState({ options: [] });
      }

  }


  render() {
    return (
      <form onSubmit={this.handleSubmit} className='f6'>			
         <h3>Create</h3>
         <div className='Creator' >
                            <div className='FirstColumn'> 	Naam </div>
                            <label className='SecondColumn'>
                                <input type='text' name='name' onChange={this.handleChange} />
                            </label>

                            <div className='FirstColumn'> 	Type </div>
                            <label className='SecondColumn'>
                                <select name='type' onChange={this.handleChange}>
                                    {
                                        this.state.options.map((item) => {
                                return <option key={item.id} value={item.id} > {item.name}</option>
                                        })
                                    }
                                </select>

                            </label>


							<div className='FirstColumn'> 	Breedte </div>
							<label className='SecondColumn'>						
								<input type='number' name='width' onChange={this.handleChange} />
							</label>
			
							<div  className='FirstColumn'> 	Hoogte </div>					
							<label className='SecondColumn'>
								<input type='number' name='height' onChange={this.handleChange} />
							</label>
			
							<div className='FirstColumn'> 	Aantal nummers </div>					
							<label className='SecondColumn'>
								<input type='number' name='nNumbers' onChange={this.handleChange} />
                            </label>
                    
						</div>
        <input className="f6 link dim br2 ba bw1 ph3 pv1 mb3 dib dark-green" type="submit" value="Bewaren" />
      </form>
    );
  }
}
export default CreatorForm;