import React from "react";
import ReactExport from "react-data-export";
import {  Popconfirm, Button, Icon} from 'antd';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const data = [
    {
      key: '1',
      date: 'John Brown',
      author: 'John',
      category: 'New York No. 1 Lake Park',
      summary:'New York No. 1 Lake Park'

    },
    {
      key: '2',
      date: 'Jim Green',
      author: 'Jim',
      category: 'London No. 1 Lake Park',
      summary:'New York No. 1 Lake Park'
    },
    {
      key: '3',
      date: 'Joe Black',
      author: 'Joe',
      category: 'Sidney No. 1 Lake Park',
      summary:'New York No. 1 Lake Park'
    },
    {
      key: '4',
      date: 'Jim Red',
      author: 'Jim',
      category: 'London No. 2 Lake Park',
      summary:'New York No. 1 Lake Park'
    },
  ];


export default class Export extends React.Component {
    render() {
        return (
            <ExcelFile 
                element={
                   
                    <Button type="primary" onClick={this.showModal}>
                    <Icon type="export" />Export
                      </Button>
                      
                
                }>
                <ExcelSheet data={this.props.log} name="Defect Log">
                    <ExcelColumn label="Date/Time" value="fixDate"/>
                    <ExcelColumn label="Author" value="user"/>
                    <ExcelColumn label="Status" value="status"/>
                    <ExcelColumn label="Type" value="type"/>
                    <ExcelColumn label="Severity" value="severity"/>
                    <ExcelColumn label="Priority" value="priority"/>
                    <ExcelColumn label="ReassignTo" value="reassignTo"/>
                    <ExcelColumn label="DefectId" value="defectId"/>
                    <ExcelColumn label="AuditId" value="auditId"/>
                </ExcelSheet>
               
            </ExcelFile>
        );
    }
}