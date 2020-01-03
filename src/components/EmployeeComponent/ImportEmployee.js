import React from "react";
import { Modal, Button, message, Upload, Icon } from "antd";
import { API_BASE_URL_EMP } from '../../constants/index';
import reqwest from 'reqwest';

export default class ImportEmployee extends React.Component {
  state = {
    loading: false,
    visible: false,
    fileList: [],
    uploading: false
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach(file => {
      formData.append('uploadfile', file);
    });

    this.setState({
      uploading: true,
      visible:false
    });

    // You can use any AJAX library you like
    reqwest({
      name: "uploadfile",
      url: API_BASE_URL_EMP + "/database",
      method: "post",
      processData: false,
      data: formData,
      success: () => {
        console.log("dddddddddddd")
        this.props.reload()
        this.setState({
          fileList:[],
          uploading: false,
          visible:false
        });
        message.success("upload successfully.");
      },
      error: () => {
        this.setState({
          uploading: false
        });
        message.error("upload failed.");
      }
    });
    this.props.reload()
  };

  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.uploadfile);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  showModal = () => {
    this.setState({
      visible: true
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { uploading, fileList } = this.state;
    const props = {
      onRemove: file => {
        this.setState(state => {
          const index = state.fileList.indexOf(file);
          const newFileList = state.fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList
          };
        });
      },
      beforeUpload: file => {
        this.setState(state => ({
          fileList: [...state.fileList, file]
        }));
        return false;
      },
      fileList
    };
    const { visible } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.showModal}>
          Import Employee
        </Button>
        <Modal
          visible={visible}
          title="Import Employee"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              Return
            </Button>,

            <Button
              type="primary"
              onClick={this.handleUpload}
              disabled={fileList.length === 0}
              loading={uploading}
              style={{ marginTop: 16 }}
            >
              {uploading ? "Uploading" : "Start Upload"}
            </Button>
          ]}
        >
          <Upload {...props}>
            <p style={{ color: "red", margin: "0 ", display: "inline" }} >* </p> <p style={{ argin: "0 ", display: "inline" }} align="right">Upload .xls file only.</p>
            <br></br>
            <br></br>
            <Button>
              <Icon type="upload" /> Click to Upload
            </Button>
          </Upload>
        </Modal>
      </div>
    );
  }
}