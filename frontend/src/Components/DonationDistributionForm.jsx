import axios from 'axios';
import React, { Component } from 'react';

import './DonationDistributionForm.css';

const distributionUrl = 'http://localhost:8000/distribution/create';

class DonationDistributionForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      distributionType: 'money',
      distributionAmount: '',
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    axios.post(distributionUrl, {
        'resource': {
          'resource_type': this.state.distributionType,
          'quantity': this.state.distributionAmount,
        }
      })
  }

  render() {
    return (
      <div className="distribution-form">
        <h2 className="distribution-heading">New Distribution</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="distributionType">Type of Distribution:</label>
            <select
              id="distributionType"
              name="distributionType"
              value={this.state.distributionType}
              onChange={this.handleInputChange}
            >
              <option value="money">Money</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="distributionAmount">Quantity/Amount Distributed:</label>
            <input
              type="text"
              id="distributionAmount"
              name="distributionAmount"
              value={this.state.distributionAmount}
              onChange={this.handleInputChange}
            />
          </div>

          <button type="submit" className="submit-button">Log Distribution</button>
        </form>
      </div>
    );
  }
}

export default DonationDistributionForm;
