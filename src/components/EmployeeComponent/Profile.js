import {
  Modal,Icon,Table
} from "antd";
import axios from "axios";
import React from "react";
import ProfileScreen from '../SettingComponent/ProfileScreen'


export default class Profile extends React.Component {

  state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      Name:'',
      Email:'',
      Designationname:''
    
    };


    componentDidMount(){
      this.setState({
          visible: this.props.status,
         
        });
    }
  
    showModal = () => {
      
      this.setState({
        visible: true,
       
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
        visible={this.props.status}
        onOk={this.handleOk}
        confirmLoading={confirmLoading}
        onCancel={this.handleCancel}
        width="600px"
      >
     <ProfileScreen Name={this.state.Name} Email={this.state.Email} Designationname={this.state.Designationname}/>
      </Modal>
          </div>
      )
  }
}