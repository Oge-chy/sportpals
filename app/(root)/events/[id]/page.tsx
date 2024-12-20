import { getEventById, getRelatedEventsByCategory } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types/index';
import React from 'react';
import Image from 'next/image';
import { formatDateTime } from '@/lib/utils';
import Collection from '@/components/shared/Collection';
import CheckoutButton from '@/components/shared/CheckoutButton';

const EventDetails = async ({ params, searchParams }: SearchParamProps) => {
  
  const { id } = await params;  // Wait for params to be resolved
  const event = await getEventById(id);  // Fetch event by ID
  // Safely get the `page` from `searchParams`
  const { page: tempPage } = await searchParams;
  const page = Array.isArray(tempPage) ? tempPage[0] : tempPage || '1';
  // Convert `page` to a number if necessary, depending on your component's requirements
  const pageNumber = Number(page) || 1; // Ensure it is a valid number
  
  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: page as string,
  });
  if (!event) {
    return <p>Event not found</p>;
  }
  
  console.log(event)

  return (
    <>
      {/* Event Details Section */}
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="Event image"
            width={1000}
            height={1000}
            className="h-full min-h-[300px] object-cover object-center"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            {/* Event Title and Information */}
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree ? 'FREE' : `$${event.price}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.level.name}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.gender.name}
                  </p>
                </div>

                <p className="p-medium-18 ml-2 mt-2 sm:mt-0">
                  by{' '}
                  <span className="text-zinc-800">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <CheckoutButton event={event} />

            {/* Event Details */}
            <div className="flex flex-col gap-5">
              {/* Date and Time */}
              <div className="flex gap-2 md:gap-3">
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{' '}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{' '}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>

              {/* Registration Deadline */}
              <div className="flex gap-2 md:gap-3">
                <Image src="/assets/icons/calendar.svg" alt="calendar" width={32} height={32} />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center">
                  <p>
                    Registration Deadline:{' '}
                    {formatDateTime(event.registrationDeadline).dateOnly} -{' '}
                    {formatDateTime(event.registrationDeadline).timeOnly}
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="p-regular-20 flex items-center gap-3">
                <Image src="/assets/icons/location.svg" alt="location" width={32} height={32} />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            {/* Description */}
            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">Description</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-zinc-800 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Events Section */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

          <Collection 
              data={relatedEvents?.data}
              emptyTitle="No Events Found"
              emptyStateSubtext="Come back later"
              collectionType="All_Events"
              limit={3}
              page={pageNumber}
              totalPages={relatedEvents?.totalPages}
            />
      </section> 
    </>
  );
};

export default EventDetails;
