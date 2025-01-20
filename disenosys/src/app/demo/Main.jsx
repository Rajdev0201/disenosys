"use client";

import React from 'react';
import CardComponent from './CardComponent';

const Main = () => {
  const mentors = [
    {
      name: 'Rajkumar',
      designation: 'MERN Stack Developer',
      institute: 'Fortune Institute',
      tags: ['ReactJS', 'NodeJS', 'MongoDB', 'ExpressJS'],
      contact: '+91 6382209795',
    },
    {
      name: 'Sherif',
      designation: 'UI/UX Designer',
      institute: 'Fortune Institute',
      tags: ['Figma', 'Sketch', 'Adobe XD', 'CSS'],
      contact: '+91 87654 32109',
    },
    {
      name: 'Ravi',
      designation: 'Full Stack Developer',
      institute: 'Fortune Institute',
      tags: ['JavaScript', 'TypeScript', 'Angular', 'HTML'],
      contact: '+91 76543 21098',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-wrap justify-center items-center p-6">
      {mentors.map((mentor, index) => (
        <CardComponent
          key={index}
          name={mentor.name}
          designation={mentor.designation}
          institute={mentor.institute}
          tags={mentor.tags}
          contact={mentor.contact}
        />
      ))}
    </div>
  );
};

export default Main;
