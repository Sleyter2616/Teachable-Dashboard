import React, { useState } from 'react';
import { Course as CourseType, Student } from './types';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from '@mui/material';

interface CourseProps {
  course: CourseType;
  fetchStudentData: (studentIds: string[]) => Promise<Student[]>;
}

const Course: React.FC<CourseProps> = ({ course, fetchStudentData }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadStudents = async () => {
    setIsLoading(true);
    const studentIds = course.students.map((student) => student.user_id);
    const fetchedStudents = await fetchStudentData(studentIds);
    setStudents(fetchedStudents);
    setIsLoading(false);
  };

  return (
    <Box margin="auto" padding="50px 100px">
      <div key={course.id}>
        <h2>Course Name: {course.name}</h2>
        <h3>Course Heading: {course.heading}</h3>
        <button onClick={loadStudents} disabled={isLoading}>
          {isLoading ? 'Loading...' : 'Load Students'}
        </button>
        {students.length > 0 && (
          <div>
            <h2>Enrolled Students:</h2>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {students.map((student) => (
                    <TableRow key={student.user_id}>
                      <TableCell>{student.name}</TableCell>
                      <TableCell>{student.email}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    </Box>
  );
};
export default Course;
