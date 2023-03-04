import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900']
})

export const metadata = {
  title: 'Tic Tac Toe',
  description: 'Next.js Tic Tac Toe'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
