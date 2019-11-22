import React from "react";
import { Drawer, Button, Row, Col, Checkbox } from "antd";
import { ROLE_NAME, CURRENT_USER, API_BASE_URL_PRODUCT , ACCESS_TOKEN} from '../../constants/index';
import axios from "axios";

const CheckboxGroup = Checkbox.Group;

const plainOptions = ['CompanyClientTable', 'CompanyProductivityMeter', 'CompanyTimeLine', 'DefectPriorityAndSeverityChart', 'DefectTypeDoughnutChart', 'DeveloperDefectDetail', 'DeveloperDefectPercentage', 'DeveloperDefectStatusChart', 'DeveloperLineChart', 'DeveloperPrioChart', 'DeveloperRadarChart', 'PMprojectMemberTable', 'SeverityMeter'];
const defaultCheckedList = [];

export default class DashboardConfig extends React.Component {
    state = {
        visible: false,
        selectedlist: [],
        indeterminate: true,
        checkAll: false,
        id: ''
    };

    showDrawer = () => {
        this.setState({
            visible: true
        });
    };

    onClose = () => {
        this.setState({
            visible: false
        });
    };
    onChange = checkedList => {
        console.log(checkedList)
        this.props.dashconfig(checkedList);
        this.setState({
            checkedList,
            indeterminate: !!checkedList.length && checkedList.length < plainOptions.length,
            checkAll: checkedList.length === plainOptions.length,
        });
    };

    postConfigure = () => {
        console.log(this.state.checkedList)
        const obj = {
            roleName: localStorage.getItem(ROLE_NAME),
            userName: localStorage.getItem(CURRENT_USER),
            dashboardList: this.state.checkedList,

        }
        axios
            .post(API_BASE_URL_PRODUCT + '/createdashboardconfig', obj, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    componentDidMount() {

        axios
            .get(API_BASE_URL_PRODUCT + '/getbyusername/' + localStorage.getItem(CURRENT_USER), { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                if (res.data.length > 0) {
                    let selectedlist = res.data[0].dashboardList;

                    const con = [];

                    for (var i = 0; i < selectedlist.length; i++) {
                        defaultCheckedList.push(selectedlist[i])
                    }
                }
                console.log(res.data.length)
                //  this.setState({con});
                // console.log(this.state.selectedlist)


            });


    }


    state = {
        checkedList: defaultCheckedList,
    }

    refs = () => {
        this.props.reload();
    }

    onCheckAllChange = e => {
        this.setState({
            checkedList: e.target.checked ? plainOptions : [],
            indeterminate: false,
            checkAll: e.target.checked,
        });
    }

    editConfigure = () => {
        axios
            .get(API_BASE_URL_PRODUCT + '/getbyusername/' + localStorage.getItem(CURRENT_USER), { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {
                const obj = {
                    configId: res.data[0].configId,
                    roleName: res.data[0].roleName,
                    userName: localStorage.getItem(CURRENT_USER),
                    dashboardList: this.state.checkedList,

                }
                console.log(obj)
                axios
                    .put(API_BASE_URL_PRODUCT + '/updatedashboardconfig/' + res.data[0].configId, obj, { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
                    .then(res => {
                        this.props.reload();
                        console.log(res.data)

                    })
                this.setState({
                    visible: false
                });

            })

    }
    render() {
        return (
            <React.Fragment>
                <div>
                    <Button onClick={this.showDrawer}>
                        <img src="https://img.icons8.com/ios/20/000000/filter.png" alt="sorry no img" />
                    </Button>
                    <div style={{ marginLeft: '20px' }}>
                        <Row>
                            <Col span={4}>
                            </Col>
                            <Col span={20}>
                                <Drawer
                                    title="Configurations"
                                    placement="right"
                                    closable={false}
                                    onClose={this.onClose}
                                    width="300px"
                                    visible={this.state.visible}
                                    style={{ marginLeft: "18%" }}
                                >
                                    <div>

                                        <Checkbox
                                            indeterminate={this.state.indeterminate}
                                            onChange={this.onCheckAllChange}
                                            checked={this.state.checkAll}
                                        >
                                            Check all
                                            </Checkbox>
                                    </div>
                                    <br />
                                    <CheckboxGroup style={{ width: '240px' }}
                                        options={plainOptions}
                                        value={this.state.checkedList}
                                        onChange={this.onChange}
                                        defaultValue={this.state.selectedlist}
                                    />
                                    <br />
                                    <Row>

                                        <Col span={12}><Button type="dashed" onClick={this.postConfigure}>Configure</Button></Col>
                                        <Col span={12}><Button type="dashed" onClick={this.editConfigure}>EditConfigure</Button></Col>
                                    </Row>

                                </Drawer>

                            </Col>
                        </Row>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}