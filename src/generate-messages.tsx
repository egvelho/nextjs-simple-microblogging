import { faker } from "@faker-js/faker";
import type { Resource } from "src/utils/resource";
import type { MessageProps } from "src/components/feed/message";

export type GeneratedMessage = Omit<MessageProps, "createdAt"> & {
  createdAt: string;
};

export function generateMessages(amount: number): GeneratedMessage[] {
  return Array.from({ length: amount }).map(() => ({
    id: faker.datatype.uuid(),
    username: `@${faker.internet.userName().toLowerCase()}`,
    avatarSrc: faker.image.avatar() as Resource,
    createdAt: faker.date.recent().toJSON(),
    content: faker.lorem.sentences(1),
  }));
}
