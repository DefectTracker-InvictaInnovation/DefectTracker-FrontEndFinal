import React from 'react';
import {
    Breadcrumb, Row, Col, Button, Input, Icon, Avatar
} from 'antd';


class ProfileScreen extends React.Component {

    state = {
        user: "U",
        color: "tomato",
        size: "10px"
    }
    render() {

        return (

            <div
                style={{
                    padding: 24,
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>

                {/* first row */}
                <Row>
                    <Col span={24}>
                        <h2>Profile</h2>
                    </Col>
                </Row>
                <br />

                {/* profile image area */}
                <Row gutter={10}>
                    <Col span={10}>

                        <Avatar size={140} src={this.props.profilePicPath} />

                    </Col>
                    <Col span={14}>
                        <h2>{this.props.Name}</h2>
                        <br />
                        <h3>{this.props.Email}</h3>
                        <h3>{this.props.Designationname}</h3>
                        {/* upload button */}

                    </Col>
                </Row>

                <br /><br />
                {/* form area     */}
                <Row gutter={10}>
                    <Row>  <h2>Basic Information</h2></Row>
                    <Row>
                        <Col span={11}>
                            <h3>Current Status  </h3>
                        </Col>
                        <Col span={2}>
                            <h3> :  </h3>
                        </Col>
                        <Col span={11}>
                            <h3>{this.props.bench}</h3>
                        </Col>
                    </Row>
                    <Row>  <Col span={11}>
                        <h3>Working Project </h3>
                    </Col>
                        <Col span={2}>
                            <h3> :  </h3>
                        </Col>
                        <Col span={11}>
                            <h3>{this.props.projectName}</h3>
                        </Col></Row>

                    <Row>
                        <Col span={11}>
                            <h3>Working Availability </h3>
                        </Col>
                        <Col span={2}>
                            <h3> :  </h3>
                        </Col>
                        <Col span={11}>
                            <h3>{this.props.availability}</h3>
                        </Col>
                    </Row>
                </Row>
            </div>


        );
    }
}

export default ProfileScreen;