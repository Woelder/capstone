import  React from 'react';
import createGroup from '../Comp/createGroup';

export default function home(props){


    const toCreateGroup = () => {
        createGroup(props)
    }

    return(<div>
        <h1>Home</h1>
        <button onClick={toCreateGroup}>Create</button>
        <button>Join</button>
    </div>)
}