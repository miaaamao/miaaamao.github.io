import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Container } from 'react-bootstrap';
import '../../style.css';
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import { MdWorkOutline } from "react-icons/md";
import McKinsey from '../../assets/img/experience/mckinsey.png';
import Versailles from '../../assets/img/experience/versailles.png';
import PWC from '../../assets/img/experience/pwc.png';
import MindCruise from '../../assets/img/experience/mindcruise.png';
import Beecoming from '../../assets/img/experience/beecoming.png';
import ECNU from '../../assets/img/experience/ecnu_no2_high_school.png';
import STMS from '../../assets/img/experience/stms.png'

function Experiences() {
    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Mia's Portfolio - Experiences</title>
                </Helmet>
            </HelmetProvider>
            <Container fluid className="skills-wrapper">
                <div className="skills-left animate__animated animate__zoomIn">
                    <h3>Experiences</h3>
                    <h4>
                        ───&nbsp;&nbsp;Page <strong>03</strong>
                    </h4>
                </div>
                <br /> 
                 <VerticalTimeline lineColor="#F5F5F5"> 
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="September 2025 - Present"
                        contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
                        contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
                        iconStyle={{ background: '#75aadb', color: '#fff' }}
                        position='left'
                        icon={<MdWorkOutline />}
                    >
                        <h3 className="vertical-timeline-element-title">SAT Instructor and College Admissions Counselor (Part-Time)</h3>
                        <a href="https://www.beecoming.cn" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">Beecoming</h4> </a>
                        <a href="https://www.beecoming.cn"> <img className="vertical-timeline-element-image" src={Beecoming} width={140} height={140} alt="Beecoming"/></a>
                        <h4 className="vertical-timeline-element-subtitle">San Jose, CA</h4>
                        <p>
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>

                 <VerticalTimeline lineColor="#F5F5F5"> 
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="September 2024 - September 2025"
                        contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
                        contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
                        iconStyle={{ background: '#75aadb', color: '#fff' }}
                        position='right'
                        icon={<MdWorkOutline />}
                    >
                        <h3 className="vertical-timeline-element-title">Assistant Insructional Designer of International Education (Remote)</h3>
                        <h4 className="vertical-timeline-element-subtitle">Shanghai Tongzhou Model School</h4>
                        <img className="vertical-timeline-element-image" src={STMS} width={140} height={140} alt="Shanghai Tongzhou Model School"/>
                        <h4 className="vertical-timeline-element-subtitle">Shanghai, China</h4>
                        <p>
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>


                <VerticalTimeline lineColor="#F5F5F5"> 
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="September 2022 - January 2023"
                        contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
                        contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
                        iconStyle={{ background: '#75aadb', color: '#fff' }}
                        position='left'
                        icon={<MdWorkOutline />}
                    >
                        <h3 className="vertical-timeline-element-title">AP Calculus Tutor & Substitute Math Teacher</h3>
                        <h4 className="vertical-timeline-element-subtitle">International Division of No.2 High School of ECNU</h4>
                        <img className="vertical-timeline-element-image" src={ECNU} width={140} height={140} alt="International Division of No.2 High School of ECNU"/>
                        <h4 className="vertical-timeline-element-subtitle">Shanghai, China</h4>
                        <p>
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>

                 <VerticalTimeline lineColor="#F5F5F5"> 
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="September 2022 - November 2022"
                        contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
                        contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
                        iconStyle={{ background: '#75aadb', color: '#fff' }}
                        position='right'
                        icon={<MdWorkOutline />}
                    >
                        <h3 className="vertical-timeline-element-title">Business Analyst Intern</h3>
                        <a href="https://www.mckinsey.com" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">McKinsey & Company</h4> </a>
                        <a href="https://www.mckinsey.com"> <img className="vertical-timeline-element-image" src={McKinsey} width={140} height={140} alt="McKinsey"/></a>
                        <h4 className="vertical-timeline-element-subtitle">Beijing, China</h4>
                        <p>
                            Developed merge pipeline from Snowflake Stages to Prod tables and automated tasks in Snowflake Tasks functions and Alteryx to refresh data sources by 10% and aligned with daily ingestion data from customers' transactions.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>

                <VerticalTimeline lineColor="#F5F5F5"> 
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="June 2022 - July 2022"
                        contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
                        contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
                        iconStyle={{ background: '#75aadb', color: '#fff' }}
                        position='left'
                        icon={<MdWorkOutline />}
                    >
                        <h3 className="vertical-timeline-element-title">Portfolio Analyst Intern</h3>
                        <a href="https://www.versaillesgroup.com" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">Versailles Group</h4> </a>
                        <a href="https://www.versaillesgroup.com"> <img className="vertical-timeline-element-image" src={Versailles} width={140} height={140} alt="Versailles"/></a>
                        <h4 className="vertical-timeline-element-subtitle">Boston, MA</h4>
                        <p>
                            Performed investment judgments by calculating the return on investments and applied Monte Carlo Simulations and Probability theory using Python to evaluate the relationship between each variable and measure the expected results of independent events.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>

                <VerticalTimeline lineColor="#F5F5F5"> 
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="June 2021 - September 2021"
                        contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
                        contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
                        iconStyle={{ background: '#75aadb', color: '#fff' }}
                        position='right'
                        icon={<MdWorkOutline />}
                    >
                        <h3 className="vertical-timeline-element-title">Bussiness Analyst Intern</h3>
                        <a href="https://www.pwc.com" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">PricewaterhouseCoopers</h4> </a>
                        <a href="https://www.pwc.com"> <img className="vertical-timeline-element-image" src={PWC} width={140} height={140} alt="PwC"/></a>
                        <h4 className="vertical-timeline-element-subtitle">Shanghai, China</h4>
                        <p>
                            Created financial valuation models in Python to analyze 5M+ historical data to track the firm’s productivity, market sizing, and potential growth to evaluate business values and financial worth in the investment portfolio.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>

                <VerticalTimeline lineColor="#F5F5F5"> 
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        date="June 2020 - September 2020"
                        contentStyle={{ border: '#accce6', boxShadow: '4px 5px 4px 3px #a7cbe8' }}
                        contentArrowStyle={{ borderRight: '7px solid  #75aadb' }}
                        iconStyle={{ background: '#75aadb', color: '#fff' }}
                        position='left'
                        icon={<MdWorkOutline />}
                    >
                        <h3 className="vertical-timeline-element-title">Data Analyst Intern</h3>
                        <a href="https://www.tencent.com/" style={{textDecoration: 'none'}}> <h4 className="vertical-timeline-element-subtitle">MindCruise Technology</h4> </a>
                        <a href="https://www.tencent.com/"> <img className="vertical-timeline-element-image" src={MindCruise} width={140} height={140} alt="MindCruise"/></a>
                        <h4 className="vertical-timeline-element-subtitle">Shanghai, China</h4>
                        <p>
                            Collaborated with product engineer team to design and implement full life cycle A/B tests; Defined key metrics and sampling methodologies to evaluate the impact of algorithmic changes on system performance, resulting in a 5% improvement in accuracy.
                        </p>
                    </VerticalTimelineElement>
                </VerticalTimeline>
                <br /> <br /> <br /> <br /> <br /> <br /> <br />
            </Container>
        </>
    );
}
export default Experiences;
