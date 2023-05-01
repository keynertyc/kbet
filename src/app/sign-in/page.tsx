import { SignIn } from '@clerk/nextjs/app-beta'

const Page = () => (
  <div className="flex justify-center items-center h-screen">
    <SignIn signUpUrl="/sign-up" />
  </div>
)

export default Page
