import {ConnectedApp as App} from './App';
import { FluidTable }from "../lib/";
import  {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import store  from './store';

function hello() {
    return <h1>Sample</h1>;
}
ReactDOM.render(<Provider store={store}>

    <FluidTable name="table" 
        value={[
            {"sample":"Yo"}
        ]} columns={[{
        name:"sample",
        label:"Sample Lang",
        component: hello
    }]}/>

</Provider>, document.getElementById('root'));