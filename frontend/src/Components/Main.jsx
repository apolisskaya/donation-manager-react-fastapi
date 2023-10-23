import React, { Component } from 'react';
import DonationForm from './DonationForm';
import DonationDistributionForm from './DonationDistributionForm';
import Reports from './Reports';
import InventoryReport from './InventoryReport';
import DonorReport from './DonorReport';

import './Main.css';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showReport: false,
      selectedReportType: null,
      reportData: null,
    };
  }

  handleGenerateReport = (reportData, reportType) => {
    this.setState({ showReport: true, reportData: reportData, selectedReportType: reportType });
  }

  handleGoBack = () => {
    this.setState({ showReport: false });
  }

  render() {
    const { showReport, selectedReportType, reportData } = this.state;

    return (
      <div className="main-container">
        <div className="main-content">
          {showReport ? (
            <div className="report-container">
              <button className="button-close" onClick={this.handleGoBack}>X</button>
              {selectedReportType === 'inventory' ? (
                <InventoryReport reportData={reportData} />
              ) : (
                <DonorReport reportData={reportData} />
              )}
            </div>
          ) : (
            <div>
              <DonationForm />
              <DonationDistributionForm />
              <Reports onGenerateReport={this.handleGenerateReport} />
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Main;
