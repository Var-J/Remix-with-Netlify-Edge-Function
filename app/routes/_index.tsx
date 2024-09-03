import type { MetaFunction } from "@netlify/remix-runtime";
import React, { Suspense } from "react";
import { Await, Link, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { defer } from "@remix-run/router";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  // Timeout to simulate a slow network request
  const links = new Promise((resolve) => setTimeout(resolve, 2000)
  ).then(() => [
    {
      name: "15m Quickstart Blog Tutorial",
      href: "https://remix.run/tutorials/blog"
    },
    {
      name: "Deep Dive Jokes App Tutorial",
      href: "https://remix.run/tutorials/jokes"
    },
    {
      name: "Remix Docs",
      href: "https://remix.run/docs"
    }
  ])

  return defer({ links })
}


export default function Index() {
  const { links } = useLoaderData<typeof loader>()

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <Suspense fallback={<div>Loading....</div>}>
        <Await resolve={links} >
          {(links) => <LazyComponent links={links} />}
        </Await>
      </Suspense>
    </div>
  );
}

function LazyComponent({links}: {links: {name: string, href: string}[]}) {
  return (
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <Link to={link.href}>{link.name}</Link>
        </li>
        ))}
    </ul>
  )
}
