import React from 'react';


const buttons = (props) => {
	const {onButtonClicked, createMode,blockMode, nButtons} = props;	
	let buttons = [];
	if (nButtons===9)
		buttons = ['1','2','3','4','5','br','6','7','8','9'];
	if (nButtons<9) {
		buttons = Array.from(new Array(nButtons), (x,i) => i+1);
	}
	if (nButtons===12)
		buttons = ['1','2','3','4','5','6','br','7','8','9','A','B','C'];
	if (nButtons===16)
		buttons = ['1','2','3','4','5','6','7','8','br','9','A','B','C','D','E','F','G'];
	if (blockMode)
		{
			buttons.push('0');		
		}
	buttons.push('br');
	buttons.push('Clear');
	if (createMode)
		{
			buttons.push('Block');			
            if (blockMode) buttons.push('Region');
            if (blockMode) buttons.push('Invalid');
		}
	const screen = buttons.map((button, i)=>{				
		let brKey = `br${i}`
		return(
			(button==='br')? <br key={brKey}/>:
						<a key={button} className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-mid-gray"  onClick={()=>onButtonClicked(button)} >{button}</a>					
		)}
	)
	return (
		<div className="pa4">
			{screen}
		</div>
		);
}


export default buttons;