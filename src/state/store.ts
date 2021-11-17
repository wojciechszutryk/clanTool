import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import { devToolsEnhancer } from 'redux-devtools-extension'
import thunk from 'redux-thunk'

function configureStore(initialState = {}) {
    const store = createStore(
        reducers,
        initialState,
        compose(applyMiddleware(thunk), devToolsEnhancer({}))
    )
    return store
}

const store = configureStore()
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
