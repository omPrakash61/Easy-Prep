import React from 'react';

function WelcomeBanner() {
  return (
    <div className='p-5 bg-gradient-to-br from-blue-500 via-indigo-800 to-pink-700 rounded-xl'>
      <h1 className='mx-4 font-semibold pb-4 text-2xl text-white'>
        Welcome to EasyPrep - <span className='bg-gradient-to-r from-yellow-300 via-pink-500 to-violet-600 bg-clip-text text-transparent'>AI</span> Powered Learning Platform
      </h1>
      <p className='text-white mx-4'>
        Learn, Create and Explore Your favorite Course with help of
      </p>
      <p className='text-white mx-4'>
        <span className='bg-gradient-to-r from-yellow-300 via-pink-500 to-violet-600 bg-clip-text text-transparent font-bold text-xl'>
          AI
        </span>{' '}
        Powered Roadmaps
      </p>
    </div>
  );
}

export default WelcomeBanner;
