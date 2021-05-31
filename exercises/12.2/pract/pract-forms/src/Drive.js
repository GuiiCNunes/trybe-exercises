import React from 'react';

class Drive extends React.Component {
  render() {
    const { value, handleChange} = this.props;
    return (
      <select name='drive' value={value} onChange={handleChange}>
        <option value='car'>Carro</option>
        <option value='motorcycle'>Moto</option>
      </select>
    );
  }
}

export default Drive;
