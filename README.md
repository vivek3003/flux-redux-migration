**Gradually Migrating from Flux to Redux**

This README is one way you could go about Migrating a large [ flux app to Redux](http://redux.js.org/docs/recipes/MigratingToRedux.html)



**Editing a flux store**

Consider a flux store, [TodoStore](https://facebook.github.io/flux/docs/todo-list.html#creating-stores)

While you are migrating to redux, the first step would be to create the reducer for this store. However, remeber that it is important that you keep the API provided by your store the same. This is because your components are still dependent on the flux store's listeners and getter functions.

Thus one way to go about this, is to split your flux store into 2 files as follows

```javascript
// FILE: intermediateFluxStore.js

//IMPORTS

//CHANGE EVENTS
var CHANGE_EVENT = 'change';

/**
 * Keep it in migration folder. You can delete the entire migration folder when you have created all
 * reducers.
 */
import {default as createFluxStore} from 'migration/createFluxStore.js';
import {todos} from 'reducers/todos.js';

/**
  * The createFluxStore is different from the original redux/createStore in 2 ways,
  * 1. It accepts both action.type and action.actionType. It also adds the 'type' key so that your reducer
  *    will work as required.
  *
  * 2. It passes the action['type'] as parameter to the subscribed callbacks. You can use this if you have 
  *    to emit different events based on the actionType.
  */

var todoReduxStore = createFluxStore(todos);
//You can replace this with createStore once your components become aware of redux through store.subscribe or react-redux.

var TodoStore = assign({}, EventEmitter.prototype, {
  getAll: function() {
    //Now we take data from the store.
    return todoReduxStore.getState()['_todos'];
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  dispatcherIndex: AppDispatcher.register(function(payload) {
    var action = payload.action;
    //If you are using createFluxStore
    todoReduxStore.dispatch(action);
    //EndIf
     
    //If you are using createStore from Redux
    action['type'] = action.actionType;
    todoReduxStore.dispatch(action);
    //EndIf
  })

});

todoReduxStore.subscribe(function(actionType){
  /**
  * Here you can emitChange based on the actionType.
  * 
  */
})
```

Next the reducer file,
```javascript
//FILE: reducer.js

//REQUIRED IMPORTS
const initialState = {
  '_todos':{}
}

export function todos(state=initialState, action){
  // Remember your actions must have type key. createFluxStore adds actionType to the type internally.
  switch(action.type){ 
  
  
    //Here you will add the logic which was present in your store's dispatch Handler.
  
    default:
     return state;
  }
}
```

With this approach,

1. None of your components will break since the store's listeners and getters are still present

2. Getter functions are retrieving data from your redux store. Thus, Tests you have return for your flux store will work here.

3. This Intermediate store can exist alongside flux stores, until you migrate them to redux stores.

4. Finally, you could simply combine all the reducers and create a single store.
