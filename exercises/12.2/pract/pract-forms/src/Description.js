import React from 'react';

class Description extends React.Component {
  render() {
    const { value, handleChange, hasErros } = this.props;
    hasErros(value.length > 15);
    return (<textarea name="description" value={value} onChange={handleChange} />);
  }
}

export default Description;