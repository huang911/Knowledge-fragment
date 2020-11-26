1.node中自己实现了一个发布订阅

``function Girl() {`
`}`

`let girl = new Girl();`

`girl.__proto__ == Girl.prototype;`

`Girl.prototype.__proto__ = Object.prototype;`

对象的原型的`__proto__`指向的是null;

2.继承父类的原型方法：

`Girl.prototype__proto__ = EventEmitter.prototype;`

`Object.setPrototypeOf(Girl.prototype, EventEmitter.prototype)`

3.观察者包含发布订阅

观察者模式会有两个类，观察者会被存到被观察者中，如果被观察者状态变化，会主动通知观察者，调用观察者的更新方法。

