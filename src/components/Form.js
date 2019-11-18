import React from 'react'
import { stringify } from 'qs'
import { serialize } from 'dom-form-serializer'

import './Form.scss'

class Form extends React.Component {
  static defaultProps = {
    name: 'Contact',
    subject: 'New message from Contact Form', // optional subject of the notification email
    action: '',
    successMessage: 'Thanks for your enquiry, we will get back to you soon',
    errorMessage:
      'There is a problem, your message has not been sent, please try contacting us via email'
  }

  state = {
    disabled: false
  }

  handleSubmit = e => {
    e.preventDefault()
    if (this.state.disabled) return

    const form = e.target
    const data = serialize(form)

    this.setState({ disabled: true })
    fetch(form.action + '?' + stringify(data), {
      method: 'POST'
    })
    .then(res => {
      if (res.ok) {
        return res
      } else {
        throw new Error('Network error')
      }
    })
    .then(() => {
      form.reset()
      this.setState({
        successMessage: this.props.successMessage,
        disabled: false
      })
    })
    .catch(err => {
      console.error(err)
      this.setState({
        disabled: false,
        errorMessage: this.props.errorMessage
      })
    })
  }

  render() {
    const { name, subject, action } = this.props
    const { successMessage, errorMessage } = this.state

    return successMessage ? <p>{successMessage}</p>
      : <form
        className='Form'
        name={name}
        subject={subject}
        action={action}
        onSubmit={this.handleSubmit}
        data-netlify=""
        data-netlify-honeypot="_gotcha"
      >
        <label className='Form--Label'>
          <input
            className='Form--Input'
            type='text'
            placeholder='Name'
            name='name'
            required
          />
        </label>
        <label className='Form--Label'>
          <input
            className='Form--Input'
            type='email'
            placeholder='Email'
            name='email'
            required
          />
        </label>
        <label className='Form--Label'>
          <textarea
            className='Form--Input Form--Textarea'
            placeholder='Message'
            name='message'
            rows='10'
            required
          />
        </label>
        <input type="text" name="_gotcha" style={{ display: 'none' }} />
        {!!subject && <input type="hidden" name="subject" value={subject} />}
        <input type="hidden" name="form-name" value={name} />
        {errorMessage && <p>{errorMessage}</p>}
        <input
          className='button Form--SubmitButton'
          type='submit'
          value='Submit'
        />
      </form>
  }
}

export default Form
