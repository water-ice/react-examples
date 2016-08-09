'use strict';
/*eslint no-console:0*/
import pureRender from 'pure-render-decorator';
import React ,{Component} from 'react';
import './test.scss';
@pureRender
class Index extends Component{
    constructor(props){
        super(props);
    }
    render(){
        //console.log(this.props);
        let { count , theme , themeAction , increase} = this.props;
        return (
            <div className="circle">
                <div style={{color:theme}}>{count}</div>
                <div onClick={themeAction}>切换主题</div>
                <div onClick={()=>{increase(1);}}>+1</div>
                <div onClick={()=>{increase(2);}}>+2</div>
            </div>
        );
    }
}
export default Index;
