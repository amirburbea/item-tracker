import * as React from 'react';
import { Toolbar, TabsContainer, Tabs, Tab } from 'react-md';
import ItemTypes from '../itemTypes';

export interface AppStateProps {
  itemCount: number;
  typeCount: number;
}

export interface AppDispatchProps {
  loadData: () => void;
}

export class App extends React.PureComponent<AppStateProps & AppDispatchProps> {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const { itemCount, typeCount } = this.props;
    return (
      <div>
        <Toolbar
          title={`React Simple Item Tracker - ${itemCount} item${
            itemCount === 1 ? '' : 's'
          } (${typeCount} type${typeCount === 1 ? '' : 's'})`}
          colored
        />
        <TabsContainer panelClassName="md-grid" colored>
          <Tabs tabId="simple-tab" mobile={false}>
            <Tab label="Item Types">
              <ItemTypes />
            </Tab>
            <Tab label="Items">
              <div />
            </Tab>
          </Tabs>
        </TabsContainer>
      </div>
    );
  }
}
