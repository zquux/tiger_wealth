export function Background() {
  return (
    <>
      <div className='h-full w-full bg-black'>
        <div className='absolute inset-0 top-auto flex justify-between'>
          <div
            className='h-[400px] w-[400px] rounded-full bg-red-500 opacity-60
              blur-[50px]'></div>
          <div
            className='h-[400px] w-[400px] rounded-full bg-green-500 opacity-60
              blur-[50px]'></div>
        </div>
      </div>
    </>
  )
}
