# flux-redux-migration

Modified createStore from Redux, to use in a flux Store.
The only change made is in the dispatch function,

```javascript
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error(
        'Actions must be plain objects. ' +
        'Use custom middleware for async actions.'
      )
    }

    if (typeof action.type === 'undefined') {
      if(typeof action.actionType === 'undefined'){
        throw new Error(
          'Actions may not have an undefined "type" property. ' +
          'Have you misspelled a constant?'
        )
      }else{
        action['type'] = action.actionType;
      }
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.')
    }

    try {
      isDispatching = true
      currentState = currentReducer(currentState, action)
    } finally {
      isDispatching = false
    }

    var listeners = currentListeners = nextListeners
    for (var i = 0; i < listeners.length; i++) {
    /*
    * This is the only change. I pass actionType as a param to the listener.
    * Thus you can emit the correct event using a switch case on the action Type.
    */
      listeners[i](action['type'])
    }

    return action
  }
```
