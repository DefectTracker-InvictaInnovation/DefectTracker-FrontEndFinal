import {
    Modal,Icon,Table
  } from "antd";
  import axios from "axios";
  import React from "react";
  import {ACCESS_TOKEN,API_BASE_URL} from './../../constants/index'
  
  const columns = [
    {
      title: 'Date/Time',
      dataIndex: 'fixDate',
    },
    {
      title: 'Name',
      dataIndex: 'user',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Status',
      dataIndex: 'status',
     
    },
    {
        title: 'Priority',
        dataIndex: 'priority',
       
      },
      {
        title: 'Severity',
        dataIndex: 'severity',
       
      },
      {
        title: 'AssignTo',
        dataIndex: 'assignTo',
       
      },
  ];
  
 

  export default class DefectLog extends React.Component {

    state = {
        ModalText: 'Content of the modal',
        visible: false,
        confirmLoading: false,
        defId:'',
        data:''
      };


      componentDidMount(){
          console.log(this.state.defId)
      }
    
      showModal = () => {
        console.log(this.props.id)

        axios
        .get(API_BASE_URL+"/auditLog/" + this.props.id,{ headers: { Authorization: 'Bearer ' + localStorage.getItem(ACCESS_TOKEN)}})
        .then(resp => {
          let audit = resp.data;
          console.log(audit);
  
          const log = [];
          audit.map((post, index) => {
            log.push({
              key: index,
              fixDate: post.fixDate,
              user: post.user,
              status: post.status,
              priority: post.priority,
              severity:post.severity,
              assignTo:post.reassignTo
            });
          });
  
         
            this.setState({ data:log });
         
        });


        this.setState({
          visible: true,
          defId:this.props.id
        });
      };
    
      handleOk = () => {
        this.setState({
          ModalText: 'The modal will be closed after two seconds',
          confirmLoading: true,
        });
        setTimeout(() => {
          this.setState({
            visible: false,
            confirmLoading: false,
          });
        }, 2000);
      };
    
      handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      };

    render(){
        const { visible, confirmLoading, ModalText } = this.state;
        return(
            <div>
        <Icon type="unordered-list" onClick={this.showModal} 
        style={{ fontSize: "18px", color: "green" }}/>
        <Modal
          title="Title"
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
          width="1000px"
        >
         <Table columns={columns} dataSource={this.state.data} />
        </Modal>
            </div>
        )
    }
  }