import { faker } from "@faker-js/faker";
import type { Resource } from "client/utils/resource";
import type { MessageProps } from "client/feed/message";

export type GeneratedMessage = Omit<MessageProps, "createdAt"> & {
  createdAt: string;
};

export function generateMessages(amount: number): GeneratedMessage[] {
  return Array.from({ length: amount }).map(() => ({
    id: faker.datatype.number(),
    username: `@${faker.internet.userName().toLowerCase()}`,
    avatarSrc: faker.image.avatar() as Resource,
    createdAt: faker.date.recent().toJSON(),
    content: faker.lorem.sentences(1),
  }));
}
