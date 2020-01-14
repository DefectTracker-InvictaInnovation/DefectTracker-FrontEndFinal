import React from 'react';
import {  Row, Col } from "antd";

class Mail extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Defect Tracker/{this.props.defectAbbr}</h1>
                    <h2>{this.props.defectDescription}</h2>
                <Row>
                    <Col span={12}>
                        <p>
                            <b>Defect ID:</b>
                        </p>
                    </Col>
                    <Col span={12}>
                        <p>{this.state.defectAbbr}</p>
                    </Col>
                </Row>
            </div>

        );
    }
}

export default Mail;
