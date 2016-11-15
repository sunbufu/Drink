var user; //用户信息
var config = {
	authDomain: "shsdrink.wilddog.com"
}
wilddog.initializeApp(config);

function logIn(email, pwd, succCallBack, failCallBack) {
	wilddog.auth().signInWithEmailAndPassword(email, pwd)
		.then(function(res) {
//			plus.nativeUI.toast("登陆成功");
			user = wilddog.auth().currentUser;
//			console.log(res);
			succCallBack(wilddog.auth().currentUser);
		}).catch(function(err) {
//			plus.nativeUI.toast("用户名或密码错误");
			failCallBack();
		});
}