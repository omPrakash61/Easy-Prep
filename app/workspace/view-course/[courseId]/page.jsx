// import { useParams } from 'next/navigation'
import React from 'react'
import EditCourse from '../../edit-course/[courseId]/page';

function page() {
  return (
    <div>
      <EditCourse viewCourse={true}/>
    </div>
  )
}

export default page
