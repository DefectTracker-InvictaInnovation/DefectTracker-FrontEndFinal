import React from 'react';
import { Timeline, Col, Icon} from 'antd';


const CompanyTimeline = () => {
    return (
        <Col className="gutter-row" span={12} >
            <div
                style={{
                    padding: 24,
                    background: '#fff',
                    borderRadius: "0.2em",
                    minHeight: '48.2em',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)', transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
                }}>

                {/* Doughnut Chart starts here*/}
                <div>
                    <div className="content-section introduction">
                        <div className="feature-intro">
                            <h1>Timeline</h1>
                            <br></br>
                            <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo quod facere minima. Perferendis recusandae accusamus architecto enim aut. Et minima neque suscipit quaerat veritatis. Ipsa perspiciatis nisi vero quae aperiam!</p>
                        </div>
                    </div>
                    <br />

                    {/* timeline area starts here */}
                    <div className="content-section implementation">
                        <Timeline mode="alternate">
                            <Timeline.Item>Create a services site 2019-09-01</Timeline.Item>
                            <Timeline.Item color="green">Solve initial network problems 2019-09-01</Timeline.Item>
                            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
                                laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
                                beatae vitae dicta sunt explicabo.
                    </Timeline.Item>
                            <Timeline.Item color="red">Network problems being solved 2019-09-01</Timeline.Item>
                            <Timeline.Item>Create a services site 2019-09-01</Timeline.Item>
                            <Timeline.Item dot={<Icon type="clock-circle-o" style={{ fontSize: '16px' }} />}>
                                Technical testing 2019-09-01
                    </Timeline.Item>
                            <Timeline.Item dot={<Icon type="play-circle" />}>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti, quasi quibusdam officiis illum hic cum temporibusluptatum
                        </Timeline.Item>
                            <Timeline.Item color="green">
                                Lorem ipsum dolor sit amet consectetur adipisicingsfdasjh cufsrjhgsfgbm temporibusluptatum
                        </Timeline.Item>
                        </Timeline>
                    </div>
                    {/* timeline area ends here */}

                </div>
            </div>
        </Col >
    );
}

export default CompanyTimeline;