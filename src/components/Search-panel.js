import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';





export default class WithCallbacks extends Component {
  constructor(props) {
    super(props)
    this.state = { inputValue: '' };
    this.options = this.props.options; // prepend this
    this.filterColors = this.filterColors.bind(this)
  }


  filterColors = (inputValue) => {
    return this.options.filter(i =>
      i.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(this.filterColors(inputValue));
    }, 100);
  };

  handleInputChange = (newValue) => {
    const inputValue = newValue.replace(/\W/g, '');
    this.setState({ inputValue });
    return inputValue;
  };
  render() {
    console.log(this.props.options)
    return (
      <div>
        {/* <pre>inputValue: "{this.state.inputValue}"</pre> */}
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions={this.options}
          onInputChange={this.handleInputChange}
          placeholder='Введите город'
        />
      </div>
    );
  }
}