
将公共的commomActionCreator引入到独立的curActionCreator 我们暂时称为（common+cur）

actions:bindActionCreators(actions,dispath)，这个时候actions就是公用和独立的dispath方法（common+cur）；


触发公用的commomActionCreator 会遇到一下问题：
比如:
触发一次 this.props.actions.navigator()；切换路由
将会执行所有的reducers为actionTypes为'CHANGE_PATH'选项

我们引发其他思考：
1.商品页加入一个商品到 加入购物车页面中，我们要提示购物车页面的数据为需要更新的状态

（公共的增加（cartAdd-commomActionCreator）引入到 独立的商品页（cart-curActionCreator）形成actions:bindActionCreators(actions,dispath)（common+cur），这个时候只需要在购物车页面对应的reducers的switch选项中加入cartAdd-AactionType）就可以让购物车中的数据提示得到更新，我们拒绝使用全局的方式乱改数据）

2.但是有些又是独立，但是方法又是共用，触发这个AactionType只执行一个相关的；（设计一个中间件，传入一个AactionType，在curActionCreator也只对应这个唯一的AactionType）



1.navigator的原理是思考1
2.request的原理是思考2



