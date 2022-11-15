import { Carousel } from 'flowbite-react';
import Image from 'next/image';

const Banner = () => {
  return (
    <div className="container mx-auto h-56 sm:h-64 xl:h-80 2xl:h-96 px-7 lg:px-4">
        <Carousel>
            <div className='relative h-32 lg:h-96'>
                <Image
                    priority
                    src="/banner1.png"
                    alt="Banner1"
                    objectFit="cover"
                    layout="fill"
                />

            </div>
            <div className='relative h-32 lg:h-96'>
                <Image
                    src="/banner2.png"
                    alt="Banner2"
                    objectFit="cover"
                    layout="fill"
                />
            </div>
        </Carousel>
        </div>
  )
}

export default Banner;