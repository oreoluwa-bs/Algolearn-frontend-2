import React, { useState, useContext, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Select } from 'antd';
import { utils } from '../../../config';
import { CourseContext } from '../../../store/context/course';

const { Option } = Select;

const EnrollmentStats = (props) => {
    const { handleGetCourseEnrolledStats } = useContext(CourseContext);
    const [enrolledStats, setEnrolledStats] = useState([...Array(12).fill(0)]);

    const handleChangeYear = async (year) => {
        const res = await handleGetCourseEnrolledStats(props.course._id, year);

        const statts = res.data.stats;
        let enrolledStatsData = new Array(12);
        statts.forEach(element => {
            enrolledStatsData[element.month - 1] = element.numEnrolled;
        });
        enrolledStatsData = Array.from(enrolledStatsData, item => item || 0);

        setEnrolledStats(enrolledStatsData);
        // setUsersCount(res.data.userCount);
    }

    const onChange = (value) => {
        handleChangeYear(value);
    }

    useEffect(() => {
        const handleInit = async () => {
            const res = await handleGetCourseEnrolledStats(props.course._id, new Date().getFullYear());

            const statts = res.data.stats;
            let enrolledStatsData = new Array(12);
            statts.forEach(element => {
                enrolledStatsData[element.month - 1] = element.numEnrolled;
            });
            enrolledStatsData = Array.from(enrolledStatsData, item => item || 0);

            setEnrolledStats(enrolledStatsData);
        }
        handleInit();
    }, [handleGetCourseEnrolledStats, props.course]);

    return (
        <div>
            <div>
                <Select showSearch style={{ width: 100, float: 'right' }} placeholder="Select a year" defaultValue={new Date().getFullYear()} onChange={onChange}
                    optionFilterProp="children" filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                    {
                        utils.getYearRange().map((yearValue) => <Option key={yearValue} value={yearValue}>{yearValue}</Option>)
                    }
                </Select>
            </div>
            <Line
                data={
                    {
                        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
                        datasets: [
                            {
                                label: 'Enrolled Users / month',
                                borderWidth: 1,
                                pointBorderColor: 'rgba(75,192,192,1)',
                                pointBackgroundColor: '#fff',
                                pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                                pointHoverBorderColor: 'rgba(220,220,220,1)',
                                pointHitRadius: 10,
                                backgroundColor: 'rgba(75,192,192,0.4)',
                                borderColor: 'rgba(75,192,192,1)',
                                borderCapStyle: 'butt',
                                // borderDash: [5],
                                data: enrolledStats
                            }
                        ]
                    }
                }
                // width={100}
                height={100}
            // options={{ maintainAspectRatio: false }}
            />
        </div>
    );
}

export default EnrollmentStats;