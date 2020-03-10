import React from 'react';

const nanoid = require('nanoid/generate')
//2346789ABCDEFGHJKLMNPQRTUVWXYZ_abcdefghjklmnpqrtwxyz- 
//char set to use as has no look alikes
//https://www.npmjs.com/package/nanoid#custom-alphabet-or-length
export default function createGroup(props){

    //let newGroup = props.fire.database().ref('Groups/' + nanoid('2346789ABCDEFGHJKLMNPQRTUVWXYZ_abcdefghjklmnpqrtwxyz-', 10));
    
    props.history.push("/group?id=" + nanoid('2346789ABCDEFGHJKLMNPQRTUVWXYZ_abcdefghjklmnpqrtwxyz-', 10) + "&user=" + (props.username ?? "noName"))
    return(
    <div></div>
    )
}