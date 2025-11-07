"use client";

import { IContentDetails } from "./ContentDetails";

export default function Details({ content }: { content: IContentDetails }) {
  console.log("the details is ", content);
  return <div>content </div>;
}
