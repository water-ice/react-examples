import React,{ Component, PropTypes} from 'react';
import pureRender from 'pure-render-decorator';
@pureRender
class Rtf extends Component {
	constructor(props, context) {
		super(props, context);
	}
	render() {
		const {
			html,
			m_tb
		} = this.props;
		return (
			<div className="diy-conitem" style={{margin:m_tb+" 0"}}>
				<div dangerouslySetInnerHTML={{__html:html}} />
			</div>
		);
	}
}
Rtf.propTypes = {

};
export default Rtf;