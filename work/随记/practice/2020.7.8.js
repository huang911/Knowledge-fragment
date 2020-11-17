/**
* 真假对象如何实现方法的链式调用
**/
Function.prototype.addMethod = function() {
	this.checkName = function(value) {
		console.log('checkName', value);
	};
	this.checkPwd = function(value) {
		console.log('checkPwd', value);
	}
}
addMethod.checkName('aa').checkPwd('bb');
/**
* 定义一个可以为函数添加多个方法的addMethod方法
**/
var addMethod = function addMethod() {};
addMethod.checkName = function(value) {
	console.log('checkName', value);
}
addMethod.checkPwd = function(value) {
	console.log('checkPwd', value);
}
const ss = new addMethod();
ss.checkName('aa').checkPwd('bb');
/**
* 定义一个既可以为原型添加方法又可为其自身添加方法的addMethod方法
**/

class addMethod {
	constructor () {
		this.checkName = checkName;
		this.checkPwd = checkPwd;
	}
}

Function.prototype.addMethod = function () {

}