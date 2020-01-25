import React from 'react';
import { reduxForm, Field } from 'redux-form';

class StreamForm extends React.Component {

  renderError = ({ touched, error }) => {
    if (touched && error) {
      return <div className="ui error message">{error}</div>
    }
    return <div />
  }

  renderUserError() {
    if (this.props.isSignedIn === false) {
      return <span className="ui error message" style={{ display: 'inline' }}>Sign in is required.</span>
    }
    return <div></div>
  }

  renderInput = ({ input, label, meta }) => {
    const fieldClass = `field ${meta.touched && meta.error ? 'error' : ''}`
    return (
      <div className={fieldClass} >
        <label>{label}</label>
        <input {...input} />
        <div>{this.renderError(meta)}</div>
      </div>
    )
  }

  onSubmit = formValues => {
    if (this.props.userId) {
      formValues = { ...formValues, userId: this.props.userId }
      this.props.onSubmit(formValues);
    }
  }

  renderDisabled() {
    if (!this.props.isSignedIn) {
      return true;
    }
    return false;
  }

  render () {
    const disabled = !this.props.isSignedIn;
    return (
      <div>
        <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
          <Field name="title" component={this.renderInput} label="Title" />
          <Field name="desc" component={this.renderInput} label="Description" />
          <button className="ui button primary" disabled={disabled}>Submit</button>
          {this.renderUserError()}
        </form>
      </div>
    )
  }
}

function validate(formValues) {
  const errors = {};
  if (!formValues.title) {
    errors.title = 'You must enter a title.'
  }
  if (!formValues.desc) {
    errors.desc = 'You must enter a description.'
  }
  return errors;
}

export default reduxForm({
  form: 'stream-form',
  validate
})(StreamForm);
