import * as React from 'react';
import { Toolbar, TabsContainer, Tabs, Tab, Snackbar } from 'react-md';
import ItemTypes from '../itemTypes';
import Items from '../items';

export interface AppStateProps {
  itemCount: number;
  typeCount: number;
  errorText: string | undefined;
}

export interface AppDispatchProps {
  loadData: () => void;
  clearErrorText: () => void;
}

export class App extends React.PureComponent<AppStateProps & AppDispatchProps> {
  componentDidMount() {
    this.props.loadData();
  }

  render() {
    const { itemCount, typeCount, errorText, clearErrorText } = this.props;
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
              <Items />
            </Tab>
          </Tabs>
        </TabsContainer>
        <Snackbar
          toasts={errorText ? [{ text: errorText }] : []}
          autohide={true}
          onDismiss={clearErrorText}
        />
      </div>
    );
  }
}
