import React from "react";
import { site } from "./site";
import Head from "next/head";

const MetaTags = ({ title }: { title: string }) => {
  return (
    <Head>
      <title>{`${site.name} | ${title}`}</title>
    </Head>
  );
};

export default MetaTags;
