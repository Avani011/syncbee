import React from 'react'
import DateScroller from '@/components/task/DateScroller'
import Task from '@/components/task/Task'

const TaskPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <DateScroller />
      <Task />
    </div>
  )
}

export default TaskPage
