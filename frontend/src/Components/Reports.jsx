import axios from 'axios';
import React, { Component } from 'react';

import './Reports.css';

const reportUrl = 'http://localhost:8000/report';

class Reports extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReportType: 'inventory',
      reportData: null,
    };
  }

  handleReportTypeChange = (e) => {
    this.setState({ selectedReportType: e.target.value });
  }

  generateReport = () => {
    const { selectedReportType } = this.state;

    const reportTypeUrl = selectedReportType === 'inventory' ? 'inventory' : 'donor';
    axios.post(`${reportUrl}/${reportTypeUrl}`)
      .then((response) => {
        this.setState({ reportData: response.data });
        this.props.onGenerateReport(response.data, this.state.selectedReportType); 
      })
      .catch((error) => {
        console.error('Error fetching report:', error);
        this.setState({ reportData: null });
      });
  }

  render() {
    return (
      <div className="reports">
        <h2>Donation Reports</h2>
        <div>
          <label htmlFor="reportType">Select Report Type:</label>
          <select
            id="reportType"
            onChange={this.handleReportTypeChange}
            value={this.state.selectedReportType}
          >
            <option value="inventory">Inventory Report</option>
            <option value="donor">Donor Report</option>
          </select>
        </div>
        <button className="submit-button" onClick={this.generateReport}>Generate Report</button>
      </div>
    );
  }
}

export default Reports;
