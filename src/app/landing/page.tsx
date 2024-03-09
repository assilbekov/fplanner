import type { Metadata } from "next"
import Image from "next/image";
import { Container } from "~/components/ui/container";
import { Button } from "~/components/ui/button";

import { Label } from "~/components/ui/label";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FPlanner",
  description: "Plan your future based on your money flow",
}

export default async function Page() {
  return (
    <div>
      <div className="border-b flex justify-between items-center px-6 py-4">
        <Label className="text-lg font-bold">FPlanner</Label>
        <Link href="/">
          <Button size="sm">
            Log in
          </Button>
        </Link>
      </div>
      <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
        <Container>
          <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
            <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
              <h1 className="text-4xl font-medium tracking-tight text-gray-900">
                Visualize Your Financial Future with Ease
              </h1>
              <p className="mt-6 text-lg text-gray-600">
                Effortlessly manage your finances with our intuitive web app.
                Input your financial details, from expenses to incomes, and instantly see
                your future bank balance through clear, dynamic graphs. Make smarter financial
                decisions and confidently plan for the future, all in one place.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
                <Link href="/">
                  <Button>
                    Start for free
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative -mt-4 lg:col-span-7 lg:mt-0 xl:col-span-6">
              <Image
                src="/app-screen.png"
                alt=""
                width={400}
                height={800}
                className="pointer-events-none absolute inset-0 h-full w-full"
                unoptimized
              />
            </div>
          </div>
        </Container>
      </div>
    </div>
  )
}
