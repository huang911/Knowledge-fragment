### 1.适用于使用Redux的场景，从组件的角度看：

a.某个组件的状态，需要共享；

b.某个状态需要在任何地方都可以拿到；

c.一个组件需要改变全局状态；

d.一个组件需要改变另一个组件的状态；

### 2.Redux的设计思想：

a.Web应用是一个状态机，视图与状态是一一对应的；

b.所有的状态，保存在一个对象里面；

```js
//createStore的简单实现
const createStore = (reduces) => {
	let state;
	let listeners = [];

	const getState = () => state;
  	
  const dispatch = (action) => {
    		state = reducer(state, action);
    		listeners.for((listen) => listen());
    	};
    	
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter(l => l !== listener);
    }
  };

  dispath({});

  return { getState, dispatch, subscribe};

}

const combineReducers = reducers => {
  return (state = {}, action) => {
    		return Object.keys(reducers).reduce(
    			(nextState, key) => {
    				nextState[key] = reducers[key](state[key], action);
    				return nextState;
    			}
    		)
    	}
}
```
