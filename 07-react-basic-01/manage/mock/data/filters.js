let Mock  = require('mockjs');
let Random = Mock.Random; 

let items = [];
for (let i = 0; i <= 2; i++) {
	items[i] = {};
	items[i].value = i + '';
	items[i].label = `${i}_${Random.cword(1, 2)}`;
	items[i].children = [];
	for(let j = 0; j <= 3; j++) {
		items[i].children[j] = {};
		items[i].children[j].value = j + '';
		items[i].children[j].label = `${i}_${j}_${Random.cword(1, 2)}`;
		items[i].children[j].children = [];
		for(let k = 0; k <= 4; k++) {
			items[i].children[j].children[k] = {};
			items[i].children[j].children[k].value = k + '';
			items[i].children[j].children[k].label = `${i}_${j}_${k}_${Random.cword(1, 2)}`;
		}
	}
}
module.exports = items;
// module.exports = [
// 	{
// 		value:"1",
// 		label:"微商1(一级)",
// 		children:[
// 			{
// 				value:"1",
// 				label:"微商1_1(二级)",
// 				children:[
// 					{
// 						value:"1",
// 						label:"微商1_1_1(三级)"
// 					},
// 					{
// 						value:"2",
// 						label:"微商1_1_2(三级)"
// 					}
// 				]
// 			},
// 			{
// 				value:"2",
// 				label:"微商1_2(二级)",
// 				children:[
// 					{
// 						value:"1",
// 						label:"微商1_2_1(三级)"
// 					},
// 					{
// 						value:"2",
// 						label:"微商1_2_2(三级)"
// 					}
// 				]
// 			}

// 		]
// 	},
// 	{
// 		value:"2",
// 		label:"代理1(一级)",
// 		children:[
// 			{
// 				value:"1",
// 				label:"代理2_1(二级)",
// 				children:[
// 					{
// 						value:"1",
// 						label:"代理2_1_1(三级)"
// 					},
// 					{
// 						value:"2",
// 						label:"代理2_1_2(三级)"
// 					}
// 				]
// 			},
// 			{
// 				value:"2",
// 				label:"代理2_2(二级)",
// 				children:[
// 					{
// 						value:"1",
// 						label:"代理2_2_1(三级)"
// 					},
// 					{
// 						value:"2",
// 						label:"代理2_2_2(三级)"
// 					}
// 				]
// 			}

// 		]
// 	}
// ];

