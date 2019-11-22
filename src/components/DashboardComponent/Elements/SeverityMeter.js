import React, { Component } from 'react';
import { Progress, Row } from 'antd';

const SeverityMeter = () => {

    return (
        <Row>

            <div
                style={{
                    padding: 24,
                    borderRadius: "0.2em",
                    background: '#fff',
                    minHeight: '250px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>

                <h1>Severity Meter</h1>
                <br />


                {/* Progress bar 1 - line */}
                <Progress
                    strokeColor={{
                        '0%': '#834d9b',
                        '100%': '#d04ed6',
                    }}
                    percent={39.9}
                    status="active"
                />
                <div style={{ minHeight: "0.8em" }}></div>


                {/* Progress bar 2 - line */}
                <Progress
                    strokeColor={{
                        from: '#1e3c72',
                        to: '#2a5298',
                    }}
                    percent={49.9}
                    status="active"
                />
                <div style={{ minHeight: "0.8em" }}></div>


                {/* Progress bar 3 - line */}
                <Progress
                    strokeColor={{
                        '0%': '#fd746c',
                        '100%': '#ff9068',
                    }}
                    percent={59.9}
                    status="active"
                />
                <div style={{ minHeight: "0.8em" }}></div>


                {/* Progress bar 4 - line */}
                <Progress
                    strokeColor={{
                        from: '#C02425',
                        to: '#F0CB35',
                    }}
                    percent={89.9}
                    status="active"
                />
            </div>
        </Row>
    );
}

export default SeverityMeter;
