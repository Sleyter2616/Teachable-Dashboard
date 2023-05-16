import React from 'react';
import CourseReport from './CourseReport';

const App: React.FC = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          Teachable Course Assignment
        </h1>
      </header>
      <main>
        <CourseReport />
      </main>
    </div>
  );
};

export default App;
