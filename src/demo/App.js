import { FluidTable } from '../lib';
import React from 'react';
import moment from 'moment';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{ field: 'name', label: 'Name' },
    { field: 'surname', label: 'Surname' },
    {
      field: 'date', label: 'Created on',
      transform: (value) => {
        console.log('value', value);
        const format = moment(value).format("MMM Do YY");
        console.log('format', format);
        return format;
      }
    }];
    this.state = {};
  }
  componentWillMount() {
    setTimeout(() => {
      this.setState({
        value: [{ name: 'jerico', surname: 'deguzman', date: new Date() }]
      });
    }, 800);
  }
  render() {
    return (<FluidTable name="sampleTable" columns={this.columns} value={this.state.value} />);
  }
}