"use server";

import { prisma } from "@/lib/prisma";
import { wait } from "@/lib/wait";
import { createCollectionSchemaType } from "@/schema/createCollection";
import { currentUser } from "@clerk/nextjs";

export async function createCollection(form: createCollectionSchemaType) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  await wait(1000);

  return await prisma.collection.create({
    data: {
      userId: user.id,
      color: form.color,
      name: form.name,
    },
  });
}

export async function delectCollection(id: number) {
  const user = await currentUser();

  if (!user) {
    throw new Error("user not found");
  }

  await wait(2000);
  return await prisma.collection.delete({
    where: {
      id: id,
    },
  });
}
