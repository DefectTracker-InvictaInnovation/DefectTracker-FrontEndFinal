import React from 'react';
import CompanyEmployee from './CompanyEmployee';
import {
    Breadcrumb,PageHeader
} from 'antd';
import Employee from './Employee';

class CompanyAdministration extends React.Component {

    /*
    Author: 
    Last Updated: dd/MM/YYYY

    Note: Please do necessary commenting and follow code standard.
      */
    constructor(props) {
        super(props);
    }

    componentWillMount() {
    }

    componentDidMount(){
    }

    render() {
        const { handleSwitchChange } = this.props;
        const routes = [{
                path: 'index',
                breadcrumbName: 'Home',
            },
            {
                path: 'first',
                breadcrumbName: 'HR',
            },
        ];
        return (
            <React.Fragment>
                <PageHeader title="Human Resources" breadcrumb={{ routes }} />
                <div
                    style={{
                    padding: '0 24px 24px 24px',
                    background: '#fff',
                    minHeight: '500px',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>
                    <Employee />
                </div>
                
            </React.Fragment>

        );
    }
}

export default CompanyAdministration;
