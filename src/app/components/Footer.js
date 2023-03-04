import Link from 'next/link'
export default function FooterPage() {
  return (
    <footer className='flex justify-center items-center py-2 text-white max-sm:flex-wrap'>
      <div className='flex items-center gap-1'>
        Made by
        <Link
          className='font-bold'
          href='https://github.com/JJozef'
          target='_blank'
          rel='noopener noreferrer'
        >
          Jose Ignacio
        </Link>
      </div>
      <div className='mx-1'>|</div>
      <div>
        <Link
          className='font-bold'
          href='https://github.com/JJozef/tic-tac-toe'
          target='_blank'
          rel='noopener noreferrer'
        >
          Source😎
        </Link>
      </div>
    </footer>
  )
}
