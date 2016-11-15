mui.init();
var plainTable = document.getElementById("plainTable");

var app = new Vue({
	el: '#plainSum',
	data: {
		sum: 1900
	}
})
var plaintData = new Vue({
	el: '#plainTable',
	data: {
		items: [{
			time: '09:55',
			yield: '300',
			show: true
		}, {
			time: '09:55',
			yield: '350',
			show: true
		}, {
			time: '09:55',
			yield: '400',
			show: true
		}, {
			time: '09:55',
			yield: '390',
			show: true
		}, {
			time: '09:55',
			yield: '320',
			show: true
		}, {
			time: '10:30',
			yield: '310',
			show: true
		}]
	}

})

function drink(item) {
	if(item) {//完成了某一个选中的计划
		var date = new Date();
		mui.confirm("喝了" + item.yield + "ml", date.getHours() + ":" + date.getMinutes(), ['完成', '取消'], function(e) {
			if(e.index == 0) {
				console.log('喝完了');
				item.show = false;
			} else {}
		});
	} else {//多喝了多少水
		var date = new Date();
		mui.prompt("单位ml", "喝了多少水？", date.getHours() + ":" + date.getMinutes(), ['确定', '取消'], function(e) {
			if(e.index == 0) {
				if(isNaN(e.value)) {
					mui.toast('请输入数字');
					return;
				}
			} else {
				console.log("您没有修改容量");
			}
		});
	}
}

function changeTime(item) {
	var oldTime = item.time;
	var H = oldTime.split(':')[0];
	var M = oldTime.split(':')[1];
	console.log(H + ":" + M);
	var dTime = new Date();
	dTime.setHours(H, M);
	plus.nativeUI.pickTime(function(e) {
		var d = e.date;
		H = d.getHours();
		M = d.getMinutes();
		item.time = (H > 9 ? H : '0' + H) + ':' + (M > 9 ? M : '0' + M);
	}, function(e) {
		console.log("您没有选择时间");
	}, {
		title: "请选择时间",
		is24Hour: true,
		time: dTime
	});
}

function changeYield(item) {
	mui.prompt("单位ml", item.yield, '', ['确定', '取消'], function(e) {
		if(e.index == 0) {
			if(isNaN(e.value)) {
				mui.toast('请输入数字');
				return;
			}
			item.yield = e.value;
		} else {
			console.log("您没有修改容量");
		}
	});
}
//----------------------------生成喝水记录------------------//
var option = {
	"legend": {
		"data": ["饮水量", "计划饮水量"]
	},
	"grid": {
		"x": 35,
		"x2": 10,
		"y": 30,
		"y2": 25
	},
	"toolbox": {
		"show": false,
		"feature": {
			"mark": {
				"show": true
			},
			"dataView": {
				"show": true,
				"readOnly": false
			},
			"magicType": {
				"show": true,
				"type": ["line", "bar"]
			},
			"restore": {
				"show": true
			},
			"saveAsImage": {
				"show": true
			}
		}
	},
	"calculable": false,
	"xAxis": [{
		"type": "category",
		"data": ["10-01", "10-02", "10-03", "10-04", "10-05", "10-06", "10-07"]
	}],
	"yAxis": [{
		"type": "value",
		"splitArea": {
			"show": true
		},
		"axisLabel": {
			"show": "true",
			"formatter": "{value}k"
		}
	}],
	"series": [{
		"name": "饮水量",
		"type": "line",
		"data": [1.8, 2.0, 1.8, 1.5, 1.8, 1.8, 1.8],
		"itemStyle": {
			"normal": {
				"label": {
					"show": true
				}
			}
		}
	}, {
		"name": "计划饮水量",
		"type": "line",
		"data": [1.8, 1.8, 1.8, 1.8, 1.8, 1.8, 1.8]
	}]
};
var lineChart = echarts.init(document.getElementById('lineChart'));
lineChart.setOption(option);
//document.getElementById("echarts").addEventListener('tap', function() {
//	var url = this.getAttribute('data-url');
//	plus.runtime.openURL(url);
//}, false);
//----------------------------生成喝水记录------------------//

//----------------------------记录喝水记录------------------//
function getDayStr() {
	var date = new Date();
	var yearStr = date.getFullYear();
	var monthStr =
		((date.getMonth() + 1) < 9) ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
	var dateStr = (date.getDate() < 9) ? '0' + date.getDate() : date.getDate();
	return '' + yearStr + monthStr + dateStr;
}

function getTimestamp() {
	new Date().getTime() / 100;
}
var todayStr = "{" + getDayStr() + ":{'sum':0,'updateTime':''}}"; //getDayStr();
console.log(todayStr);
var sum = 0;
var todayData = {};
eval("todayData.ST" + getDayStr() + " = 123");
console.log(JSON.stringify(todayData));
//{
//	todayStr: {
//		'sum': 0,
//		"updataTime": ''
//	}
//};
//todayData.todayStr.updataTime = getTimestamp();
//----------------------------记录喝水记录------------------//

mui.plusReady(function() {
	var self = plus.webview.currentWebview();
	initCloudDB(self.userInfo.uid, dbCallBack);

	function dbCallBack() {
		if(node.tip) {
			plus.ui.alert(node.tip);
		}
		//		plus.push.createMessage("喝水吧")
		//		plus.device.vibrate( 300 );//震动
	}
	//修改时间
	//	mui('#plainTable').on('tap', '.changeTime', function(event) {
	//		var elem = this;
	//		var li = elem.parentNode.parentNode;
	//		console.log(li.querySelector('.time').innerText);
	//		var oldTime = li.querySelector('.time').innerText.split("时间")[1];
	//		var H = oldTime.split(':')[0];
	//		var M = oldTime.split(':')[1];
	//		console.log(H + ":" + M);
	//		var dTime = new Date();
	//		dTime.setHours(H, M);
	//		plus.nativeUI.pickTime(function(e) {
	//			var d = e.date;
	//			H = d.getHours();
	//			M = d.getMinutes();
	//			li.querySelector('.time').innerText = "时间 " + (H > 9 ? H : '0' + H) + ':' + (M > 9 ? M : '0' + M);
	//		}, function(e) {
	//			console.log("您没有选择时间");
	//		}, {
	//			title: "请选择时间",
	//			is24Hour: true,
	//			time: dTime
	//		});
	//	});
	//	//修改容量
	//	mui('#plainTable').on('tap', '.changeYield', function(event) {
	//		var elem = this;
	//		var li = elem.parentNode.parentNode;
	//		var oldYield = li.querySelector('.yield').innerText.split('ml')[0];
	//		mui.prompt("单位ml", oldYield, '', ['确定', '取消'], function(e) {
	//			if(e.index == 0) {
	//				oldYield = e.value;
	//				li.querySelector('.yield').innerText = oldYield + 'ml';
	//			} else {
	//				console.log("您没有修改容量");
	//			}
	//		});
	//	});
	//	//喝水完成
	//	mui('#plainTable').on('tap', '.all', function(event) {
	//		var elem = this;
	//		var ml = getChildByClass(elem, 'yield');
	//		var mlText = ml.innerText;
	//		var mlInt = parseInt(mlText.split(ml)[0]);
	//		var st = getTimestamp();
	//		var date = new Date();
	//		mui.confirm("喝了" + mlText, date.getHours() + ":" + date.getMinutes(), ['完成', '取消'], function(e) {
	//			if(e.index == 0) {
	//				console.log('喝完了');
	//				app.sum = app.sum - mlInt;
	//				elem.parentNode.removeChild(elem); //删除这条记录
	//			} else {
	//				console.log("您没有修改容量");
	//			}
	//		});
	//	});

	function getChildByClass(ele, cls) {
		var childArr = ele.children;
		for(var i = 0, len = childArr.length; i < len; i++) {
			if(childArr[i].classList.contains(cls)) {
				return childArr[i];
			}
		}
	}

	function putToTodayData(k, V) {
		eval("todayData.ST" + K + " = " + V);
	}
	//	var last=JSON.stringify(obj); //将JSON对象转化为JSON字符

	//--
	mui.oldBack = mui.back;
	var backButtonPress = 0;
	mui.back = function(event) {
		backButtonPress++;
		if(backButtonPress > 1) {
			plus.runtime.quit();
		} else {
			plus.nativeUI.toast('再按一次退出应用');
		}
		setTimeout(function() {
			backButtonPress = 0;
		}, 1000);
		return false;
	};
});