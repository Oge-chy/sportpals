import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import { getAllEvents } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import Image from "next/image";
import Link from "next/link";
import Search from "@/components/shared/Search";
import CategoryFilter from "@/components/shared/CategoryFilter";
import LevelFilter from "@/components/shared/LevelFilter";
import GenderFilter from "@/components/shared/GenderFilter";
// 

export default async function Home({ searchParams }: SearchParamProps) {
  let { page=1, searchText="", category="", level="", gender="" } = await searchParams;
  if(Array.isArray(page)) { page = page[0]; }
  if(Array.isArray(searchText)) { searchText = searchText[0]; }
  if(Array.isArray(category)) { category = category[0]; }
  if(Array.isArray(level)) { level = level[0]; }
  if(Array.isArray(gender)) { gender = gender[0]; }
  page = Number(page);

  // const page = Number(searchParams?.page) || 1;
  // const searchText = (searchParams?.query as string) || '';
  // const category = (searchParams?.category as string) || '';
  // const level = (searchParams?.level as string) || '';
  // const gender = (searchParams?.gender as string) || '';
  
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    level,
    gender,
    limit: 6
  })

  //console.log(events)

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
          <Search />
          <CategoryFilter />
          <GenderFilter />
          <LevelFilter />
        </div>

      <Collection
        data={events?.data}
        emptyTitle="No Events Found"
        emptyStateSubtext="Come back Later"
        collectionType="All_Events"
        limit={6}
        page={1}
        totalPages={2}
      />
    </section>
</>
  );
}
