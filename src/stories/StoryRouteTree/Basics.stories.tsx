import React from "react";
import {StoryRouteTree} from "../../components/StoryRouteTree";
import {Outlet, Route, useLocation, useMatches, useParams, useSearchParams} from "react-router-dom";

export default {
  component: StoryRouteTree,
};

export const RenderChildren = {
  args: {
    children: <h1>Hi</h1>
  }
}

function ShowPath() {
  const location = useLocation();
  return <p>{location.pathname}</p>;
}

export const SpecificPath = {
  args: {
    routePath: '/foo',
    children: <ShowPath />,
  }
}

function ShowRouteParams() {
  const routeParams = useParams();
  return <p>{JSON.stringify(routeParams)}</p>;
}

export const RouteParams = {
  args: {
    routePath: '/book/:id',
    routeParams: { id: '42' },
    children: <ShowRouteParams />,
  }
}

function ShowSearchParams() {
  const [searchParams] = useSearchParams();
  return <p>{JSON.stringify(Object.fromEntries(searchParams.entries()))}</p>;
}

export const SearchParams = {
  args: {
    searchParams: { page: '42' },
    children: <ShowSearchParams />,
  }
}

function ShowHandles() {
  const matches = useMatches();
  return <p>{JSON.stringify(matches.map(m => m.handle))}</p>;
}

export const MatchesHandles = {
  args: {
    routeHandle: "Hi",
    children: <ShowHandles />,
  }
}

export const MatchesHandlesInsideOutlet = {
  args: {
    routeHandle: "Hi",
    children: <Outlet />,
    outlet: {
      handle: "Yall",
      element: <ShowHandles />,
    }
  }
}

export const OutletJSX = {
  args: {
    outlet: <h1>I'm an outlet</h1>,
    children: <Outlet />,
  }
}

export const OutletConfigObject = {
  args: {
    outlet: {
      element: <h1>I'm an outlet defined with a config object</h1>,
    },
    children: <Outlet />,
  }
}
