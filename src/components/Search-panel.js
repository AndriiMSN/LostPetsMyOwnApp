import React, { Component } from 'react';

import AsyncSelect from 'react-select/async';





export default class WithCallbacks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValue: '',
      selectedOptions: []
    };
    this.options = this.props.options;
    this.filterColors = this.filterColors.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }


  filterColors = (inputValue) => {
    return this.options.filter(i =>
      i.value.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      callback(this.filterColors(inputValue));
    }, 200);
  };

  handleInputChange = (newValue) => {
    const inputValue = newValue;
    this.setState({ inputValue });
    return inputValue;
  };

  handleChange = (selectedOptions) => {
    this.setState({ selectedOptions });
    if (this.props.selectCity) {
      this.props.selectCity(selectedOptions.value)
    }
    if (this.props.selectBreed) {
      this.props.selectBreed(selectedOptions.value)
    }
  }
  render() {
    const selectedOption = this.state.selectedOptions;
    return (
      <div>
        {/* <pre>inputValue: "{this.state.inputValue}"</pre> */}
        <p>{this.state.selectedOptions.value}</p>
        <AsyncSelect
          cacheOptions
          loadOptions={this.loadOptions}
          defaultOptions={this.options}
          onInputChange={this.handleInputChange}
          placeholder={`Введите ${this.props.title}`}
          value={selectedOption}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}