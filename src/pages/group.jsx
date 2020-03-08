import  React from 'react';
import Chat from '../Comp/Chat';
import queryString from 'querystring';

export default function group(props){

    let query = queryString.parse(props.location?.search.substring(1))
    let fb = props.fire.database().ref('Groups/'+ query.id +'/chat')
    return(
    <div>
        <h1>group</h1>
        <Chat 
        fireChat={fb}
        />
    </div>)
}