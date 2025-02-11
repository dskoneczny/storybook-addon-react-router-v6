import React from "react";
import {Outlet, useLoaderData, useRouteError} from "react-router-dom";
import {StoryRouteTree} from "../../../components/StoryRouteTree";

export default {
  component: StoryRouteTree,
};

function sleep(n: number = 500) {
  return new Promise((r) => setTimeout(r, n));
}

function loader(response: unknown) {
  return async () => sleep(100).then(() => ({ foo: response }));
}

function DataLoader() {
  let data = useLoaderData() as { foo: string };
  return <h1>{data.foo}</h1>;
}

export const RouteLoader = {
  args: {
    loader: loader("Data loaded"),
    children: <DataLoader />,
  }
}


function DataLoaderWithOutlet() {
  let data = useLoaderData() as { foo: string };
  return (
    <div>
      <h1>{data.foo}</h1>
      <Outlet />
    </div>
  );
}

function DataLoaderOutlet() {
  let data = useLoaderData() as { foo: string };
  return (
    <div>
      <h2>{data.foo}</h2>
    </div>
  );
}

export const RouteAndOutletLoader = {
  args: {
    loader: loader("Data loaded"),
    children: <DataLoaderWithOutlet />,
    outlet: {
      element: <DataLoaderOutlet />,
      loader: loader("Outlet data loaded"),
    },
  }
}


function DataErrorBoundary() {
  const error = useRouteError() as Error;
  return <h1>Fancy error component : {error.message}</h1>;
}

async function failingLoader() {
  throw new Error("Meh.");
}

export const ErrorBoundary = {
  args: {
    loader: failingLoader,
    errorElement: <DataErrorBoundary />,
    children: <DataLoader />,
  }
}