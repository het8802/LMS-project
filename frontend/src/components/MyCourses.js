import React, { useContext } from 'react'
import DataContext from '../context/data/DataContext';

function MyCourses(props) {
    const context = useContext(DataContext);
    const {getCourseData} = context;

    let courseData = getCourseData()[props.course];
    const levels = courseData['course levels'];
    return (
    <>
        <section className="header">
            <div className="bg-img">
                <img src={courseData.imgURL} alt="" />
            </div>
            <div className="bg-text">
                <h1>{courseData['course name']}</h1>
            </div>
        </section>

        <section className="body">
            <div className="steps">
                {
                    Object.keys(levels).map((level) => {
                        return (
                            <div key={level} className="level">
                                <h3>{levels[level]}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    </>
  )
}

export default MyCourses