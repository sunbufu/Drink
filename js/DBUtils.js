var cdbr; //云服务器引用
var plainR; //计划数据节点的引用
var dataR; //记录数据节点的引用
var node; //用户数据的节点

//var dbUserInfo; //用户信息
//var dbPlain; //喝水计划
//var dbData; //喝水记录
//var dbLabel;// 提醒

//初始化云服务器
//<script src="https://cdn.wilddog.com/sdk/js/2.2.0/wilddog.js"></script>
function initCloudDB(userName, callBack) {
	var config = {
		syncURL: "https://shsdrink.wilddogio.com" //输入节点 URL
	};
	wilddog.initializeApp(config);
	cdbr = wilddog.sync().ref("/" + userName);
	plainR = wilddog.sync().ref("/" + userName + "/plain");
	dataR = wilddog.sync().ref("/" + userName + "/data");
	cdbr.on('value', function(snapshot, error) {
		if(error == null) {
			node = snapshot.val();
			callBack();
		} else {
			mui.toast(error);
		}
	});
}

function reset() {
	cdbr.set({
		"userInfo": {
			"email": "",
			"nick": "sunbufu",
			"pwd": "",
			"sex": "男"
		},
		"plain": {
			"sum": 1800,
			"0730": 300,
			"1030": 300,
			"1130": 300,
			"1500": 300,
			"1600": 300,
			"1700": 300
		},
		"data": {
			"20161112": {
				"sum": 300,
				"0125": 200,
				"0225": 100,
				"updataTime": "1478907076"
			}
		},
		"tip": ""
	});
}

function getCloudPlain(node) {
	if(node) {
		return node.plain;
	} else {
		return;
	}
}

//initCloudDB("sunyoubufu");
//
//cdbr.set({
//	"userInfo": {
//		"email": "sunyoubufu@qq.com",
//		"nick": "sunbufu",
//		"pwd": "abcd1234"
//	},
//	"plain": {
//		"sum": 1200,
//		"1025": 300,
//		"1125": 300,
//		"1325": 300,
//		"1425": 300
//	},
//	"data": {
//		"20161112": {
//			"sum": 300,
//			"0125": 200,
//			"0225": 100,
//			"updataTime": "1478907076"
//		}
//	}
//});