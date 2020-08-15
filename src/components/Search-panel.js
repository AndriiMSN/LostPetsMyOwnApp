import React, { Component } from 'react';




export default class SearchPanel extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <input
        noValidate autoComplete="off" placeholder="City"
        type="text"
        onChange={}
      />
    )
  }
}