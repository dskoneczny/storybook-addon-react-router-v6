import React, {useState} from "react";
import {AddonPanel} from "@storybook/components";
import {PanelContent, PanelContentProps} from "./components/PanelContent";
import {API, useChannel} from '@storybook/api';
import {EVENTS} from "./constants";
import {STORY_CHANGED} from "@storybook/core-events";

interface PanelProps {
  active: boolean;
  api: API;
}

export const Panel: React.FC<PanelProps> = (props) => {
  const [navigationEvents, setNavigationEvents] = useState<PanelContentProps['navigationEvents']>([]);

  useChannel({
    [EVENTS.ROUTE_MATCHES]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.NAVIGATION]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.STORY_LOADED]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.ACTION_INVOKED]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.ACTION_SETTLED]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.LOADER_INVOKED]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [EVENTS.LOADER_SETTLED]: (event) => {
      setNavigationEvents(prev => [...prev, event]);
    },
    [STORY_CHANGED]: () => {
      setNavigationEvents([]);
    }
  });

  const clear = () => {
    props.api.emit(EVENTS.CLEAR);
    setNavigationEvents([]);
  }

  return (
    <AddonPanel {...props}>
      <PanelContent navigationEvents={navigationEvents} onClear={clear} />
    </AddonPanel>
  );
};
