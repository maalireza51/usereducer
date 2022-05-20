import React, { useEffect, useReducer } from 'react'
import Loading from './components/Loading'
import Toast from './components/Toast'

const init =(initstate)=>{
    return initstate;
}

const initstate = {
    toast: { type: 'info', message: '' },
    title: "",
    postId: 1,
    loading: true
}

function userAction(state, action) {
    switch (action.type) {
        case 'get-post-success':
            return {
                ...state,
                toast: { type: 'success', message: action.message },
                title: action.title,
                loading: false
            }
        case 'get-post-request':
            return {
                ...state,
                postId: action.postId,
                loading: true
            }
        default:
            return state;
    }
}


export default function App() {
    
    // const [state(sameState), dispatch(sameSetState)] = useReducer(userAction(mainfunction), initstate(defaultObject), init(editedinitstate));
    const [state, dispatch] = useReducer(userAction, initstate, init);
    // const [{postId,toast,title,loading},dispatch] = useReducer(userAction,initstate);    ${state.postId}==${postId}

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${state.postId}`)
            .then(response => response.json())
            .then(post => {
                dispatch({
                    type: 'get-post-success',
                    title: post.title,
                    message: `Post with id ${state.postId} loaded`
                })
            })
    }, [state.postId])

    function handleLoading(e) {
        dispatch({ type: 'get-post-request', postId: e.target.value })
    }

    return (
        <div className='container'>
            <div>
                <label>Post Id: </label>
                <input value={state.postId} onChange={handleLoading} type="number" />
            </div>
            <div>
                {state.loading ? <Loading /> : <h1>{state.title}</h1>}
            </div>
            <Toast type={state.toast.type} message={state.toast.message} />
        </div >

    )
}
