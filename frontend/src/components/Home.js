import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/data/DataContext'

function Home() {

    const context = useContext(DataContext);
    const {getCourseData} = context;
    const courseData = getCourseData();

  return (
    <>
        <section className="header">
            <div className="bg-img">
                <img src="https://media.istockphoto.com/photos/concept-communication-network-picture-id1194783427?k=20&m=1194783427&s=612x612&w=0&h=nNHuX4I5v6FdS5PfXB4WlyARbERyFPexvX9tVSKNkfk=" />
            </div>
            <div id='home-page-header-text' className="bg-text">
                <h1>think school</h1>
            </div>
        </section>
        <div className="courses">
            <div className="my-courses">
                <h4>My courses</h4>
                <div className="course-tiles">
                    {
                        Object.keys(courseData).map((course) => {
                            return (
                                <div key={course} className="tile">
                                    <Link className='course-link' to={`/my-course/${course}`}>
                                        <img src={courseData[course].imgURL} alt="" />
                                        <div className="layer"><h3>{courseData[course]['course name']}</h3></div>
                                    </Link>
                                </div>
                            )
                        })
                    }
                    
                </div>
            </div>
        </div>
    </>
  )
}


export default Home