import * as React from 'react';
import {
  ListItem,
  List,
  Button,
  Card,
  CardText,
  CardActions,
  CardTitle
} from 'react-md';
import { Item, ItemType, ItemStatus } from '../../models';

export interface ItemsStateProps {
  items: Item[];
}

export interface ItemsDispatchProps {
  deleteItem: (id: number) => void;
  completeItem: (id: number) => void;
  createItem: (type: ItemType) => void;
}

export interface State {
  listItems: JSX.Element[];
}

const strikeThrough: React.CSSProperties = { textDecoration: 'line-through' };
const normal: React.CSSProperties = {};

export class Items extends React.PureComponent<
  ItemsStateProps & ItemsDispatchProps,
  State
> {
  state: State = { listItems: [] };
  componentWillMount() {
    this.createListItems(this.props);
  }

  componentWillReceiveProps(nextProps: ItemsStateProps) {
    if (nextProps.items !== this.props.items) {
      this.createListItems(nextProps);
    }
  }

  render() {
    const {
      state: { listItems }
    } = this;
    return (
      <Card className="md-block-centered">
        <CardTitle title="Item Types" />
        <CardText>
          <List style={{ minWidth: '500px' }}>{listItems}</List>
        </CardText>
        <CardActions>
          {/*
          <TextField
            id="text-field"
            label="Item Type Name"
            lineDirection="center"
            className="md-cell md-cell--bottom"
            style={{ width: '50%' }}
            value={text}
            error={!!errorText}
            errorText={errorText}
            onChange={onChange}
          />
          <Button
            flat
            className="md-cell md-cell--bottom"
            disabled={!!errorText || !text}
            onClick={createItemType}
          >
            Add New...
        </Button>*/}
        </CardActions>
      </Card>
    );
  }

  private createListItems({ items }: ItemsStateProps) {
    return items.map(item => (
      <ListItem
        key={item.id}
        primaryText={`${item.id}:${item.type.name}`}
        primaryTextStyle={
          item.status === ItemStatus.complete ? strikeThrough : normal
        }
        renderChildrenOutside
      >
        <Button icon primary>
          public
        </Button>
      </ListItem>
    ));
  }
}
