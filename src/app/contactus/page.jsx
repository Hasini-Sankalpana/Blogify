export default function ContactUs() {
    return (
      <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
        <h1 className='text-3xl font-semibold'>Contact Us</h1>
        <p className='text-md text-gray-500'>
          We would love to hear from you! Here&apos;s how you can reach us:
        </p>
  
        <div className='w-full'>
          <h2 className='text-xl font-semibold mt-4 text-center'>Email</h2>
          <p className='text-md text-gray-600 text-center'>
            <a href='mailto:support@blogify.com' className='text-teal-500 hover:underline text-center'>
              silvahasini085@gmail.com
            </a>
          </p>
  
          <h2 className='text-xl font-semibold mt-4 text-center'>LinkedIn</h2>
          <p className='text-md text-gray-600 text-center'>
           <a href="https://www.linkedin.com/in/hasini-sankalpana" target="blank">www.linkedin.com/in/hasini-sankalpana</a>
          </p>
  
          <h2 className='text-xl font-semibold mt-4 text-center'>GitHub</h2>
          <p className='text-md text-gray-600 text-center'>
            <a href="https://github.com/Hasini-Sankalpana" target="blank">https://github.com/Hasini-Sankalpana</a>
          </p>
        </div>
      </div>
    );
  }
  