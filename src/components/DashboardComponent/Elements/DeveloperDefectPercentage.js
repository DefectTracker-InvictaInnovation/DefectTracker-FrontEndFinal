import React from 'react';
import { PageHeader, Row, Col, Progress } from 'antd';

const DeveloperDefectPercentage = () => {

    //html part of percentage meter 
    return (
        <div>
            <PageHeader title="Defect" style={{ padding: 0, minHeight: 30 }} />
            <Row >

                <Col span={24}>

                    <h3>New</h3>
                    <Progress percent={55} />
                    <h3>Open</h3>
                    <Progress percent={5} />
                    <h3>Reject</h3>
                    <Progress percent={10} />
                    <h3>Closed</h3>
                    <Progress percent={30} />


                </Col>
            </Row>
        </div>
    );
}

export default DeveloperDefectPercentage;

