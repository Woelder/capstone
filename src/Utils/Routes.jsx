import React from 'react';
import { Switch } from 'react-router-dom';
import Login from '../pages/login/login'
import AppliedRoute from "../Comp/AppliedRoute"

export default ({childProps}) => (
    <Switch>
        		<AppliedRoute path='/Login' exact component={Login} props={childProps} />
    </Switch>
)