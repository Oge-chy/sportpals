import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
<>
    <section className="bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-10">
    <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
      <div className="flex flex-col justify-center gap-8">
        <h1 className="h1-bold">
          Find and participate in sporting events you enjoy! Connect and Play!
        </h1>
        <p className="p-regular-20 md:p-regular-24">
        Numerous ways to get active and exercise yourself through sports
        </p>
        <Button size="lg" asChild className="bg-black button w-full sm:w-fit">
          <Link href="#events">
            Explore Now
          </Link>
        </Button>
      </div>

      <Image src="/assets/images/pics.png" width={1000} height={1000}
                alt= "pics" className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
                />
    </div>
    </section>

    <section id="events" className=" wrapper my-8 flex flex-col gap-8 md:gap -12">
      <h2 className="h2-bold">where sport events <br />thrive

      </h2>

      <div className="flex w-full flex-col gap-5 md:flex-row">
        search
        category
        level
        gender
      </div>
    </section>
</>
  );
}
