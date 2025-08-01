import { Board } from '@/entities/board'

function HomePage() {
  return (
    <div>
      <div
        className='bg-vimpire-black relative mx-auto mt-10 min-h-[888px] w-full
          max-w-[1440px] overflow-hidden rounded-[48px]'>
        <div>
          <div
            className='bg-light-green absolute right-0 size-[100px]
              -translate-y-[60%] translate-x-[15%] rounded-full opacity-40
              blur-3xl lg:size-[402px] lg:blur-[277px]'></div>
          <div
            className='bg-paradise-red absolute bottom-0 left-0 size-[100px]
              opacity-40 blur-3xl lg:size-[402px] lg:blur-[277px]'></div>
          <img
            src='./website-icons/Candles.png'
            className='absolute'></img>
          <img
            src='./website-icons/Dots.png'
            className='absolute'></img>
          <div
            className='mx-auto flex max-w-[700px] flex-col items-center gap-6
              px-4 pt-20 text-center'>
            <h1
              className='text-traffic-white z-10 text-center font-Nexa text-5xl
                font-bold'>
              Maximize your wealth with Expert{' '}
              <span className='text-tangerine'>Stock Advice</span>
            </h1>

            <p
              className='text-silver-gray z-10 text-center font-PTSerif text-lg'>
              Expert insights, data-driven strategies, and personalized stock
              recommendations to grow your wealth with confidence.
            </p>

            <div
              className='text-traffic-white flex items-center justify-between
                gap-2 font-Nexa'>
              <button
                className='primary-button z-10 rounded-[8px] px-6 py-3
                  uppercase'>
                Get Started
              </button>

              <div
                className='text-md bg-gradient-cta flex items-center
                  justify-center rounded-[8px] p-[1px]'>
                <button
                  className='text-traffic-white z-10 rounded-[8px] bg-[#161617]
                    px-6 py-3 uppercase'>
                  Contact Us
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='relative -top-[450px]'>
        <Board />
      </div>
    </div>
  )
}

export const Component = HomePage
