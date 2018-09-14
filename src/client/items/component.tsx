import * as React from 'react';
import {
  ListItem,
  List,
  Button,
  Card,
  CardText,
  CardTitle,
  CardActions,
  SelectField,
  TextField
} from 'react-md';
import { Item, ItemType, ItemStatus } from '../../models';

export interface ItemsStateProps {
  items: Item[];
  itemTypes: ItemType[];
}

export interface ItemsDispatchProps {
  deleteItem: (id: number) => void;
  completeItem: (id: number) => void;
  createItem: (type: ItemType, title: string) => void;
}

export interface State {
  newItemType: string;
  title: string;
  listItems: JSX.Element[];
}

const strikeThrough: React.CSSProperties = { textDecoration: 'line-through' };
const normal: React.CSSProperties = {};

export class Items extends React.PureComponent<
  ItemsStateProps & ItemsDispatchProps,
  State
> {
  state: State = { listItems: [], newItemType: '', title: '' };

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
    this.setState({ newItemType: typeName as string });
  };

  private createItem = () => {
    const {
      props: { createItem },
      state: { newItemType, title }
    } = this;
    createItem({ name: newItemType }, title.trim());
  };

  private onTitleChange = (text: React.ReactText) => {
    this.setState({ title: text as string });
  };

  render() {
    const {
      state: { listItems, newItemType, title },
      props: { itemTypes },
      onSelectChange,
      onTitleChange,
      createItem
    } = this;
    return (
      <Card className="md-block-centered">
        <CardTitle title="Items" />

        <CardText>
          <Card className="md-block">
            <CardTitle title="Create Item:" />
            <TextField
              id="title-field"
              label="Item Title"
              lineDirection="center"
              className="md-cell md-cell--bottom"
              style={{ width: '50%' }}
              value={title}
              onChange={onTitleChange}
            />
            <SelectField
              id="select"
              className="md-cell md-cell--bottom"
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
            <CardActions>
              <Button
                flat
                primary
                swapTheming
                onClick={createItem}
                disabled={!title}
                className="md-cell"
              >
                Create
              </Button>
            </CardActions>
          </Card>
          <List style={{ minWidth: '500px', marginTop: '20px' }}>
            {listItems}
          </List>
        </CardText>
      </Card>
    );
  }

  private createListItems({ items }: ItemsStateProps) {
    const { completeItem, deleteItem } = this.props;
    this.setState({
      listItems: items.map(item => {
        const style = item.status === 0 ? normal : strikeThrough;
        return (
          <ListItem
            key={item.id}
            primaryText={`${item.id} - ${item.title}`}
            secondaryText={item.type.name}
            primaryTextStyle={style}
            secondaryTextStyle={style}
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
        );
      })
    });
  }
}
