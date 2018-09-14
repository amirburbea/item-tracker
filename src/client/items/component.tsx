import * as React from 'react';
import {
  ListItem,
  List,
  Button,
  Card,
  CardText,
  CardActions,
  CardTitle,
  SelectField
} from 'react-md';
import { Item, ItemType, ItemStatus } from '../../models';

export interface ItemsStateProps {
  items: Item[];
  itemTypes: ItemType[];
}

export interface ItemsDispatchProps {
  deleteItem: (id: number) => void;
  completeItem: (id: number) => void;
  createItem: (type: ItemType) => void;
}

export interface State {
  newItemType: string;
  listItems: JSX.Element[];
}

const strikeThrough: React.CSSProperties = { textDecoration: 'line-through' };
const normal: React.CSSProperties = {};

export class Items extends React.PureComponent<
  ItemsStateProps & ItemsDispatchProps,
  State
> {
  state: State = { listItems: [], newItemType: '' };

  componentWillMount() {
    const { state, props } = this;
    if (!state.newItemType && props.itemTypes.length) {
      this.setState({ newItemType: props.itemTypes[0].name });
    }
  }

  componentWillReceiveProps(nextProps: ItemsStateProps) {
    if (!this.state.newItemType && nextProps.itemTypes.length) {
      this.setState({ newItemType: nextProps.itemTypes[0].name });
    }
    if (nextProps.items !== this.props.items) {
      this.createListItems(nextProps);
    }
  }

  private onSelectChange = (typeName: React.ReactText) => {
    this.setState({ newItemType: typeName as string }, () =>
      console.log(this.state)
    );
  };

  private createItem = () => {
    const {
      props: { createItem },
      state: { newItemType }
    } = this;
    createItem({ name: newItemType });
  };

  render() {
    const {
      state: { listItems, newItemType },
      props: { itemTypes },
      onSelectChange,
      createItem
    } = this;
    return (
      <Card className="md-block-centered">
        <CardTitle title="Items" />

        <CardActions>
          <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
            <label>Create Item:</label>
            <SelectField
              id="select"
              menuItems={itemTypes}
              itemValue="name"
              itemLabel="name"
              value={newItemType}
              onChange={onSelectChange}
              style={{
                minWidth: '200px',
                marginTop: '5px',
                marginLeft: '8px',
                marginRight: '8px'
              }}
            />
            <Button flat primary swapTheming onClick={createItem}>
              CREATE
            </Button>
          </div>
        </CardActions>

        <CardText>
          <List style={{ minWidth: '500px' }}>{listItems}</List>
        </CardText>
      </Card>
    );
  }

  private createListItems({ items }: ItemsStateProps) {
    const { completeItem, deleteItem } = this.props;
    this.setState({
      listItems: items.map(item => (
        <ListItem
          key={item.id}
          primaryText={`${item.id}:${item.type.name}`}
          primaryTextStyle={
            item.status === ItemStatus.complete ? strikeThrough : normal
          }
        >
          <Button
            flat
            disabled={item.status === ItemStatus.complete}
            onClick={() => completeItem(item.id)}
          >
            Complete
          </Button>
          <Button flat onClick={() => deleteItem(item.id)}>
            Delete
          </Button>
        </ListItem>
      ))
    });
  }
}
