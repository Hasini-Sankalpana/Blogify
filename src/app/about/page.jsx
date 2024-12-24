export default function About() {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='max-w-2xl mx-auto p-3 text-center'>
          <div>
            <h1 className='text-3xl font font-semibold text-center my-7'>
              About Blogify
            </h1>
            <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>Welcome to Blogify! Created by Hasini Sankalpana, this blog serves as a platform to share insights and ideas with the world. 
                </p>

                <p>
                On Blogify, you&apos;ll find weekly articles and tutorials covering a diverse range of topics. Whether you're interested in the latest advancements in technology, tips for a balanced lifestyle, exciting travel destinations, the latest in sports, new scientific discoveries, or the wonders of astronomy, there's something for everyone.
                </p>
  
              <p>
                We invite you to comment on our posts and interact with other
                readers. You can like and reply to others&apos; comments as well. We
                believe that a community of learners can support each other&apos;s
                growth and development.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }