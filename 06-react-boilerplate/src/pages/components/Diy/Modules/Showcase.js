import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
import {Link} from 'react-router';
@pureRender
class Title extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			style,
			item_list,
			pd,
			m_tb
		} = this.props;
		return (
			<div className="diy-conitem w-row w-reset" style={{margin:m_tb+" 0"}}>
			    <div className={
			            classnames(
			                ('diy-showcase-'+style)
			            )        
			        }
			    >
		        {item_list.map((item,index)=>{
		        	let {
		        		title,
		        		show_title,
		        		img,
		        		url
		        	} = item;
		            let styleCss = {};
		            if(style==1){
		                switch(index){
		                    case 0:
		                        styleCss ={};
		                        img = img + '!2-1';
		                        break;
		                    case 1:
		                        styleCss={
		                            width:49+'%',
		                            marginLeft:1+'%',
		                            marginBottom:.8+'%'
		                        };
		                        img = img + '!2-2';
		                        break;
		                    default:
		                        styleCss={
		                            width:49+'%',
		                            marginLeft:1+'%',
		                            marginTop:1+'%'
		                        };
		                        img = img + '!2-2';
		                        break;
		                }
		            }else if(style==2&&index==1){
		                styleCss={
		                    margin:"0 2%"
		                };
		                img = img + '!2-1';
		            }else{
		            	img = img + '!2-1';
		            }
		        	return(
			            <div className={
			                    classnames(
			                        (style==1?"w-col-6":"w-col-4")
			                    )        
			                }
			                key = {index}
			             	style={styleCss}
			            >
			                <Link to={url}>
			                    <img src={img} />
			                    {show_title&&<span className="w-oneline w-pd-lr">{title}</span>}
			                </Link>
			            </div>
		            );
		        })}
			    </div>
			</div>
		);
	}
}
Title.propTypes = {

};
export default Title;