'use client'
import { RedirectToSignIn, SignedOut, UserButton } from '@clerk/nextjs'

const Header = () => (
  <header aria-label="Page Header">
    <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">KBet</h1>

          <p className="mt-1.5 text-sm text-gray-500">
            Let&apos;s make money! 🎉
          </p>
        </div>

        <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
          <UserButton />
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </div>
      </div>
    </div>
  </header>
)

export default Header
