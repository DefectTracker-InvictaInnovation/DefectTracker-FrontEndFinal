import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { collapseSideBar, expandSideBar } from '../../actions/index';
import {
    Layout,
    Icon,
    Badge,
    Row,
    Col,
    Menu,
    Avatar,
    Dropdown,
    Input,
    Tag,
    Divider,
} from 'antd';
import { Link } from 'react-router-dom';
import axios from "axios";
import index from './Login';
import { ROLE_NAME, CURRENT_USER, API_BASE_URL, ACCESS_TOKEN } from '../../constants/index';
import "./Style.css";

const Search = Input.Search;
const { Header } = Layout;

class HeaderComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            isAuthenticated: false,
            isLoading: false,
            isBlinking: false

        }
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }
    state = {
        userprof: null
    }

    handleMenuClick({ key }) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    featchdefectbyassign = () => {
        axios.get(API_BASE_URL + "/getDefectsByAssignTo/" + localStorage.getItem(CURRENT_USER), { headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN) } })
            .then(res => {

                console.log(res.data.length)
                let count = res.data.length;
                let noti = res.data.map((post, index) => {
                    return <Menu.Item key={index}>
                        <Avatar
                            style={{
                                display: "inline-block",
                                position: 'sticky',
                                marginTop: '-40px',
                                backgroundColor: '#87d068'
                            }} icon="user" />
                        <div
                            className="notification-item"
                            style={{
                                display: "inline-block"
                            }}>
                            <div
                                style={{
                                    paddingLeft: "10px",
                                    fontSize: "0.8em",
                                    margin: "0",
                                    top: "0"
                                }}>
                                {post.defectId}&nbsp;&nbsp;{post.defectDescription} <Tag color="red">{post.severity}</Tag> !
                        </div>
                            <div
                                className="notification-item-time"
                                style={{
                                    display: "inline-block",
                                    paddingLeft: "10px",
                                    fontSize: "0.5em"
                                }}>
                                57m
                        </div>
                        </div>
                    </Menu.Item>
                })
                this.setState({ noti, count })
            })
        this.setState({ isBlinking: true })
    }

    componentDidMount() {
        this.featchdefectbyassign();
        console.log("kkkkkkkkkkkkk" + this.props.currentUser);
        this.setState({ userprof: this.props.currentUser })
    }

    onClickcollapseSidebar = (event) => {

        if (this.props.sidebar.isCollapsed == true) {
            console.log("expand");
            console.log(this.props);
            this
                .props
                .expandSideBar();
        } else if (this.props.sidebar.isCollapsed == false) {

            console.log("collapsed");
            console.log(this.props.han);
            this
                .props
                .collapseSideBar();
        } else { }
    }

    logout = () => {
        this.props.handleLogout();
    }

    render() {
        let menu = (
            <Menu style={{
                width: "350px"
            }}>
                <b style={{
                    padding: "10px"
                }}>Notification</b>

                <Divider type="vertical" />
                <a
                    style={{
                        float: "right",
                        paddingRight: "10px",
                        fontSize: "12px",
                        margin: '0'
                    }}
                    href="#">
                    View all
                </a>
                <Menu.Divider />

                {localStorage.getItem(ROLE_NAME) === "ROLE_DEVELOPER" ? this.state.noti : ""}

                <Menu.Divider />
                <p
                    style={{
                        textAlign: "center",
                        margin: "0",
                        fontSize: '13px'
                    }}>
                    <a href="">Clear All</a>

                    <Divider type="vertical" />
                    <a href="">Show all</a>
                </p>
            </Menu>
        );

        let menuItems;
        if (this.props.currentUser) {
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/home">
                        <Icon type="home" className="nav-icon" />
                    </Link>
                </Menu.Item>,

                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick} />
                </Menu.Item>
            ];
        } else {
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login">Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup">Signup</Link>
                </Menu.Item>
            ];
        }
        return (

            <Header
                style={{
                    backgroundColor: "red",
                    paddingLeft: '14px',
                    position: 'relative',
                    height: '64px',
                    padding: 0,
                    boxShadow: '0 1px 4px rgba(0,21,41,.08)'
                }}>
                <div style={{
                    float: 'left'
                }}>

                    <Icon
                        style={{
                            fontSize: '18px',
                            padding: '20px',
                        }}
                        className="trigger"
                        type={this.props.sidebar.isCollapsed
                            ? 'menu-unfold'
                            : 'menu-fold'}
                        onClick={this.onClickcollapseSidebar} />

                </div>
                <div style={{
                    float: 'left',
                    marginTop: '16px',
                    width: '250px'
                }}>
                    <Search placeholder="Search .." onSearch={value => console.log(value)} enterButton />
                </div>
                <Row
                    style={{
                        width: '150px',
                        float: 'right'
                    }}
                    type="flex"
                    justify="end">
                    <Col span={8}>
                        <Dropdown overlay={menu} trigger={["click"]}>
                            <a className="ant-dropdown-link" href="#">
                                <Badge count={this.state.count} showZero>
                                    <span class="blink_me">

                                        <Icon
                                            style={{
                                                fontSize: "18px",
                                                float: "right"
                                            }}
                                            align="right"
                                            type="bell" />
                                    </span>
                                </Badge>
                            </a>
                        </Dropdown>
                    </Col>
                    <Col span={8}>

                        <Badge count={0} showZero>
                            <Icon
                                style={{
                                    fontSize: "18px",
                                    float: "right"
                                }}
                                align="right"
                                type="question-circle" />

                        </Badge>

                    </Col>
                    <Col span={8}>

                        <Icon
                            style={{
                                fontSize: '18px',
                            }}
                            align="right"
                            type="logout"
                            onClick={this.logout}
                        />

                    </Col>

                </Row>
                <Menu
                    className="app-menu"
                    mode="horizontal"
                    selectedKeys={[this.props.location.pathname]}
                    style={{ lineHeight: '64px' }} >
                    {menuItems}
                </Menu>
            </Header>

        );

    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
            <Menu.Item key="user-info" className="dropdown-item" disabled>
                <div className="user-full-name-info">
                    {props.currentUser}
                </div>
                <div className="username-info">
                    @{props.currentUser}
                </div>
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item key="profile" className="dropdown-item">
                <Link to={`/users/${props.currentUser}`}>Profile</Link>
            </Menu.Item>

        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{ marginRight: 0 }} /> <Icon type="down" />
            </a>
        </Dropdown>
    );
}


function mapStateToProps(state) {
    return { sidebar: state.isCollapsed }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        collapseSideBar: collapseSideBar,
        expandSideBar: expandSideBar
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(HeaderComponent);
