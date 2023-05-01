import { SignUp } from '@clerk/nextjs/app-beta'

const Page = () => (
  <div className="flex justify-center items-center h-screen">
    <SignUp signInUrl="/sign-in" />
  </div>
)

export default Page
