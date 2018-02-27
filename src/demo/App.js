import { FluidTable } from '../lib';
import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{ field: 'name', label: 'Name' }, { field: 'surname', label: 'Surname' }];
    this.state = {};
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        value: [{ name: 'jerico', surname: 'deguzman' }]
      });
    }, 800);
  }
  render() {
    return (<FluidTable name="sampleTable" columns={this.columns} value={this.state.value} />);
  }
}