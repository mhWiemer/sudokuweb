import React from 'react';


class Menu extends React.Component{


	render() {
	const {onMenuOptionClicked, createMode} = this.props;
	const style = "f6 dim link br-pill ph3 pv2 mb2 dib pointer ";
	const createStyle = (createMode) ? style + "black bg-green": style + "white bg-mid-gray"; 
	return (
		 <div>	
		 		<div className="pa2">
						<a className={style +" white bg-mid-gray"} onClick={()=>onMenuOptionClicked('New')} href="#0">Create board</a>
						<br />
						<a className={createStyle} onClick={()=>onMenuOptionClicked('Create')} href="#0">Create mode</a>
						<br />
						<a className={style +" white bg-mid-gray"} onClick={()=>onMenuOptionClicked('Clear')} href="#0">Clear board</a>
						<br />			
						<br />
						<a className={style +" white bg-mid-gray"} onClick={()=>onMenuOptionClicked('Restart')} href="#0">Restart</a>
						<br />
						<a className={style +" white bg-mid-gray"} onClick={()=>onMenuOptionClicked('Open')} href="#0">Load</a>
						<br />
						<a className={style +" white bg-mid-gray"} onClick={()=>onMenuOptionClicked('Save')} href="#0">Save</a>

		 		</div>
		 </div>
    );
	}
}

export default Menu;