import React from 'react';

export default function FirstPost() {
  return (
    <>
      <h1>Under construction...</h1>
      <h2>
        <a href="/">Back to home</a>
      </h2>
      <img
        src="/images/profile.jpg" // Route of the image file
        height={144} // Desired size with correct aspect ratio
        width={144} // Desired size with correct aspect ratio
        alt="Your Name"
      />
    </>
  );
}

/*const YourComponent = () => (
  <Image
    src="/images/profile.jpg" // Route of the image file
    height={144} // Desired size with correct aspect ratio
    width={144} // Desired size with correct aspect ratio
    alt="Your Name"
  />
);*/