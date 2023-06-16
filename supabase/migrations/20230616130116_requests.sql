create type "public"."request_status" as enum ('PENDING', 'ACCEPTED');

create table "public"."requests" (
    "id" uuid not null default gen_random_uuid(),
    "artistId" uuid,
    "status" request_status not null default 'PENDING'::request_status,
    "productionProfilesId" uuid
);


CREATE UNIQUE INDEX requests_pkey ON public.requests USING btree (id);

alter table "public"."requests" add constraint "requests_pkey" PRIMARY KEY using index "requests_pkey";

alter table "public"."requests" add constraint "requests_artistId_fkey" FOREIGN KEY ("artistId") REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."requests" validate constraint "requests_artistId_fkey";

alter table "public"."requests" add constraint "requests_productionProfilesId_fkey" FOREIGN KEY ("productionProfilesId") REFERENCES "productionProfiles"(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."requests" validate constraint "requests_productionProfilesId_fkey";


