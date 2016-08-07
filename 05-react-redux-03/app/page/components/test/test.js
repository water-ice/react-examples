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
    //点击增加按钮事件
    _addHandle(num){
        let {increaseAction} = this.props;
        increaseAction(num);
    }
    //主题切换按钮事件
    _ThemeHandle(){
        let { themeAction } = this.props;
        themeAction();
    }
    render(){
        //console.log(this.props);
        let { count , theme } = this.props;
        return (
            <div className="circle">
                <div style={{color:theme}}>{count}</div>
                <div onClick={this._ThemeHandle.bind(this)}>切换主题</div>
                <div onClick={()=>{this._addHandle(1);}}>+1</div>
                <div onClick={()=>{this._addHandle(2);}}>+2</div>
            </div>
        );
    }
}
export default Index;
