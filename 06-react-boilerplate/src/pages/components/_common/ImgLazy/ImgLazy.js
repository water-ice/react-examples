import React, {PropTypes} from 'react';
import classnames from 'classnames';
import pureRender from 'pure-render-decorator';
@pureRender
class LazyImg extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false
        };
        this.targetDom = null;
        this.timer = null;

        this.onScroll = this.onScroll.bind(this);
    }
    componentDidMount() {
        this.targetDom = this.props.targetId ? document.getElementById(this.props.targetId) : document.getElementsByClassName('page-content')[0];
        if (this.targetDom) {
            this.targetDom.addEventListener('scroll', this.onScroll);
            this.doLazy();
        }
    }

    componentWillUnmount() {
        this.removeListener();
    }

    removeListener() {
        if (this.targetDom) {
            this.targetDom.removeEventListener('scroll', this.onScroll);
        }
    }

    onScroll() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
            this.doLazy();
        }, 500);
    }
    isElementOverViewport(dom){
        let rect = dom.getBoundingClientRect();
        return rect.bottom > 0 && rect.right > 0 && rect.left < (window.innerWidth || document.documentElement.clientWidth) && rect.top < (window.innerHeight || document.documentElement.clientHeight);
    }
    isElementInViewport(){
        let rect = dom.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    }
    doLazy() {
        // 显示了
        if (this.isElementOverViewport(this.refs.img)) {
            this.setState({
                show: true
            });
            this.removeListener();
        }
    }
    render() {
        const {
            className,
            src,
            placeholder,
            targetId, // eslint-disable-line
            ...rest
        } = this.props;
        const cn = classnames('lazy-img', className);

        return (
            <img {...rest} 
                ref="img" className={cn}
                src={this.state.show && src ? src : placeholder}/>
        );
    }
}

LazyImg.propType = {
    src: PropTypes.string,
    placeholder: PropTypes.string,
    targetId: PropTypes.string // 指定监听滚动的dom id
};

export default LazyImg;
