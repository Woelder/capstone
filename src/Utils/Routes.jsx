import React from 'react';
import { Route,Switch } from 'react-router-dom';
import AppliedRoute from "../Comp/AppliedRoute";
import group from '../pages/group';
import home from '../pages/home';
import joinGroup from '../pages/joinGroupUrl'
export default ({childProps}) => (
    <Switch>
                <AppliedRoute path='/' exact component={home} props={childProps} />
                <AppliedRoute path='/Group' exact component={group} props={childProps} />
                <AppliedRoute path='/joinGroup' exact component={joinGroup} props={childProps} />
                <Route component={home} />
    </Switch>
)