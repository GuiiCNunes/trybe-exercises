import React from 'react';
import Drive from './Drive';
import Description from './Description';

class Forms extends React.Component {
  constructor() {
    super()

    this.state = {
      drive: '',
      participate: "false",
      password: '',
      description: '',
      hasErros: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.hasErrors = this.hasErrors.bind(this);
  }

  handleChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState((os, _props) => ({
      [name]: value,
    }));
  }

  hasErrors(has) {
    this.setState(() => ({ hasErrors: has }));
  }

  render() {
    return (
      <form>
        <fieldset>
          <Drive handleChange={this.handleChange} value={this.state.drive} />
          <label>
            Deseja participar:
            <input type="checkbox" name='participate' value={this.state.participate} onClick={this.handleChange}/>
          </label>
        </fieldset>
        <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
        <Description handleChange={this.handleChange} value={this.state.description} hasErrors={this.hasErrors} />
        <input type="file" />
      </form>
    );
  }
}

export default Forms;