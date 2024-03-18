import SadFace from "@/components/icons/SadFace";
import CreateCollectionBtn from "@/components/shared/CreateCollectionBtn/CreateCollectionBtn";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { currentUser } from "@clerk/nextjs";
import { Suspense } from "react";

export default async function Home() {
  return (
    <>
      <Suspense fallback={<WelcomeMsgFallback />}>
        <WelcomeMsg />
      </Suspense>
      <Suspense fallback={<div>Loading Collections</div>}>
        <CollectionList />
      </Suspense>
    </>
  );
}

async function WelcomeMsg() {
  const user = await currentUser();
  await wait(3000);
  if (!user) {
    return <div>error</div>;
  }
  return (
    <div className="flex w-full mb-12">
      <h1 className="text-4xl font-bold">
        Welcome, <br /> {user.firstName}
      </h1>
    </div>
  );
}

function WelcomeMsgFallback() {
  return (
    <div className="flex w-full mb-12">
      <div className="text-4xl font-bold space-y-3">
        <Skeleton className="w-[150px] h-[36px]" />
        <Skeleton className="w-[150px] h-[36px]" />
      </div>
    </div>
  );
}

async function CollectionList() {
  const user = await currentUser();
  const collections = await prisma.collection.findMany({
    where: {
      userId: user?.id,
    },
  });

  if (collections.length === 0) {
    return (
      <div className="flex flex-col gap-5">
        <Alert>
          <SadFace />
          <AlertTitle>There are no collections yet!</AlertTitle>
          <AlertDescription>
            Create a collection to get started
          </AlertDescription>
        </Alert>
        <CreateCollectionBtn />
      </div>
    );
  }

  return (
    <div>
      Collections: {collections.length}
      <CreateCollectionBtn />
    </div>
  );
}
