import React, { useEffect, useState } from 'react';
import { Course as CourseType, Student } from './types';
import Course from './Course';

const CourseReport: React.FC = () => {
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    fetch('/api/courses')
      .then((response) => {
        if (!response.ok) {
          console.log('Error fetching courses:', response.statusText);
          throw new Error('Error fetching courses');
        }
        return response.json();
      })
      .then((data: { courses: CourseType[] }) => {
        const updatedCourses = data.courses.map(async (course) => {
          const response = await fetch(
            `/api/enrollments?courseId=${course.id}`,
          );
          const enrollments = await response.json();
          const students: Student[] =
            enrollments.enrollments
              ?.filter((enrollment: any) => {
                return enrollment.completed_at == null;
              })
              .map((enrollment: any) => {
                return { user_id: enrollment.user_id };
              }) || [];
          return { ...course, students };
        });
        Promise.all(updatedCourses).then((updatedCoursesData) => {
          const updatedCoursesWithStudents = updatedCoursesData.map(
            (courseData) => courseData,
          );
          setCourses(updatedCoursesWithStudents);
        });
      })
      .catch((error) => console.error('Error fetching courses:', error));
  }, []);

  const fetchStudentData = async (studentIds: string[]): Promise<Student[]> => {
    const studentDataPromises = studentIds.map(async (userId: string) => {
      const response = await fetch(`/api/user?userId=${userId}`);
      if (!response.ok) {
        console.log(
          'Error fetching user data for user:',
          userId,
          response.statusText,
        );
        throw new Error(`Error fetching user data for user: ${userId}`);
      }
      const userData = await response.json();
      return {
        user_id: userId,
        name: userData.name,
        email: userData.email,
      };
    });
    return Promise.all(studentDataPromises);
  };

  return (
    <div>
      {courses.map((course) => (
        <Course
          key={course.id}
          course={course}
          fetchStudentData={fetchStudentData}
        />
      ))}
    </div>
  );
};
export default CourseReport;
