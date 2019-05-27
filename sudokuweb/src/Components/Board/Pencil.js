import React from 'react';
import './Pencil.css';




class Pencil extends React.Component{

	render()
	{
		const {cellValue} = this.props;
		return (
				<div className="pencil">
						{cellValue[0]}
						<br/>{cellValue[1]} 
						<br/>{cellValue[2]}
				</div>

		)
	}
}
	/*
	render()
	{
		const {cellValue} = this.props;
		return (
			<div >
			{
				cellValue.map((item,i)=>{
					const pencil = item;					
					if (i%3===0 && i!==0) 
					{
							console.log('met break');
							return ( <div> <br/>{ pencil } </div> )
					}
					else {
							return ( <div> { pencil } </div> )
					}
				
				})
			}
			</div>
			
		)
	}
}*/

export default Pencil;