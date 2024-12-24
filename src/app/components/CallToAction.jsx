import { Button } from 'flowbite-react';
export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-blue-300 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
    <div className="flex-1 justify-center flex flex-col">
        <h2 className='text-2xl'>
            Fascinated by Space?
        </h2>
        <p className='text-gray-500 my-2'>
            Explore these incredible resources and discover the wonders of the universe
        </p>
        <Button gradientDuoTone='pinkToOrange' className='rounded-tl-xl rounded-bl-none'>
            <a href="https://www.nasa.gov" target='_blank' rel='noopener noreferrer'>
                NASA - Space Exploration
            </a>
        </Button>
    </div>
    <div className="p-7 flex-1">
        <img src="https://img.freepik.com/free-photo/glowing-sky-sphere-orbits-starry-galaxy-generated-by-ai_188544-15599.jpg" />
    </div>
</div>

  )
}