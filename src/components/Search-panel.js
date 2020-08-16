import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]
const filterColors = (inputValue) => {
  return options.filter(i =>
    i.label.toLowerCase().includes(inputValue.toLowerCase())
  );
};

const loadOptions = (inputValue, callback) => {
  setTimeout(() => {
    callback(filterColors(inputValue));
  }, 100);
};

export default class WithCallbacks extends Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' };
  }

  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    console.log(this.props)
    return (
      <div>
        <pre>inputValue: "{this.state.inputValue}"</pre>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          defaultOptions
          onInputChange={this.handleInputChange}
        />
      </div>
    );
  }
}