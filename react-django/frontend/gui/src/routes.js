import React from 'react';
import { Route } from 'react-router-dom';
import Field from './containers/Fields';
import Details from './containers/Details';
import Login from './containers/Login';
import Signup from './containers/Signup';
import Charts from './containers/Charts';
import Paiments from './containers/paiments';
import Categories from './containers/Categories';
import Settings from './containers/Settings';


const BaseRouter = () => (
    <div>
        <Route exact path='/' component={Field} />
        <Route exact path='/api/:fieldID' component={Details} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
        <Route exact path='/charts/' component={Charts} />
        <Route exact path='/paiments/' component={Paiments} />
        <Route exact path='/categories/' component={Categories} />
        <Route exact path='/settings/' component={Settings} />
    </div>
);

export default BaseRouter;