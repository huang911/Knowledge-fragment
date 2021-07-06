// Problem: 手写一个发布订阅模式
// @interview start
export class TestSub {
	constructor() {
		this.subList = []
	}
	listen(key, fn) {
		if (!this.subList[key]) {
			this.subList[key] = [fn]
		} else {
			this.subList[key].push(fn)
		}
		return () => this.remove(key, fn)
	}
	listenOnce(key, fn) {
		if (!this.subList[`${key}-once`]) {
			this.subList[`${key}-once`] = [fn]
		} else {
			this.subList[`${key}-once`].push(fn)
		}
	}
	trigger(key) {
		if (this.subList[key] && this.subList[key].length) {
			this.subList[key].forEach(fn => {
        fn.apply(null, arguments)
      })
		} else if (this.subList[`${key}-once`] && this.subList[`${key}-once`].length) {
			this.subList[`${key}-once`].forEach(fn => {
				fn.apply(null, arguments)
				this.remove([`${key}-once`], fn)
			})
			this.subList[`${key}`] = []
		}
	}

	remove(key, fn) {
		if (this.subList[key]) {
			const index = this.subList[key].indexOf(fn)
			index != -1 && this.subList[key].splice(index, 1)
		} 
	}	
}

export default new TestSub()
// @interview end
