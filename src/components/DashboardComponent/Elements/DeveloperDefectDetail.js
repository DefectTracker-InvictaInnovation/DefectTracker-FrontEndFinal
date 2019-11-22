import React from 'react'
import { Col, PageHeader, Row, Statistic } from 'antd'

class DeveloperDefectDetail extends React.Component {
render(){
    return (
        <div>
            <PageHeader title="Defect Details" />
            <div style={{ padding: 24, background: '#fff', minHeight: 50 }}>

                <Row>
                    <div className="content-section introduction">

                    </div>
                    <Col span={8}>
                        <Statistic title="Total " value={100} />
                    </Col>
                    <Col span={8}>
                        <Statistic title="New" value={55} suffix="/ 100" />
                    </Col>
                    <Col span={8}>
                        <Statistic title="Closed" value={30} suffix="/ 100" />
                    </Col>

                </Row>
            </div>
        </div>
    );
}
}
export default DeveloperDefectDetail;



