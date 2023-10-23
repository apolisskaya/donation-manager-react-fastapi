import axios from 'axios';
import React, { Component } from 'react';

import './DonationForm.css';

const donationUrl = 'http://localhost:8000/donation/create';

class DonationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      donorName: '',
      donorEmail: '',
      donorPhone: '',
      donationType: 'money',
      donationAmount: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === 'donorPhone') {
      const formattedPhoneNumber = value.replace(/\D/g, '').replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
      this.setState({ [name]: formattedPhoneNumber });
    } else if (name === 'donationAmount' && this.state.donationType === 'money') {
      // Remove non-digits, convert to an integer, and format as dollars and cents
      const formattedValue = (parseInt(value.replace(/\D/g, ''), 10) / 100).toFixed(2);
      this.setState({ [name]: formattedValue });
    } else {
      this.setState({ [name]: value });
    }
  }  

  handleSubmit = (e) => {
    e.preventDefault();
    const cleanedDonationAmt = this.state.donationAmount.replace(/\$|\./g, '');
    const donationAmtInt = parseInt(cleanedDonationAmt, 10);

    axios.post(donationUrl, {
      'donor': {
        'name': this.state.donorName,
        'email': this.state.donorEmail,
        'phone': this.state.donorPhone,
      },
      'resource': {
        'resource_type': this.state.donationType,
        'quantity': donationAmtInt,
      }
    })
  }

  render() {
    return (
      <div className="donation-form">
        <h2 className="donation-heading">New Donation</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="donorName">Donor's Name:</label>
            <input
              type="text"
              id="donorName"
              name="donorName"
              value={this.state.donorName}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="donorEmail">E-Mail:</label>
            <input
              type="text"
              id="donorEmail"
              name="donorEmail"
              value={this.state.donorEmail}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="donorPhone">Phone #:</label>
            <input
              type="text"
              id="donorPhone"
              name="donorPhone"
              value={this.state.donorPhone}
              onChange={this.handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="donationType">Type of Donation:</label>
            <select
              id="donationType"
              name="donationType"
              value={this.state.donationType}
              onChange={this.handleInputChange}
            >
              <option value="money">Money</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="donationAmount">Quantity/Amount Donated:</label>
            <input
              type="text"
              id="donationAmount"
              name="donationAmount"
              value={this.state.donationType === 'money' && this.state.donationAmount ? `$${parseFloat(this.state.donationAmount).toFixed(2)}` : this.state.donationAmount}
              onChange={this.handleInputChange}
            />
          </div>

          <button type="submit" className="submit-button">Submit Donation</button>
        </form>
      </div>
    );
  }
}

export default DonationForm;
