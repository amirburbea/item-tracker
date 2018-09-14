import * as React from 'react';
import {
  List,
  ListItem,
  Card,
  CardActions,
  CardTitle,
  CardText,
  Button,
  TextField
} from 'react-md';
import { ItemType } from '../../models';

export interface ItemTypesStateProps {
  itemTypes: ItemType[];
}

export interface ItemTypesDispatchProps {
  createItemType: (text: React.ReactText) => void;
}

type Props = ItemTypesStateProps & ItemTypesDispatchProps;

interface State {
  listItems: JSX.Element[];
  text: React.ReactText;
  errorText?: string;
}

export class ItemTypes extends React.PureComponent<Props, State> {
  state: State = { listItems: [], text: '' };

  componentWillMount() {
    this.createListItems(this.props);
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.itemTypes !== this.props.itemTypes) {
      this.createListItems(nextProps);
    }
  }

  render() {
    const {
      state: { listItems, text, errorText },
      createItemType,
      onChange
    } = this;
    return (
      <Card className="md-block-centered">
        <CardTitle title="Item Types" />
        <CardText>
          <List style={{ minWidth: '500px' }}>{listItems}</List>
        </CardText>
        <CardActions>
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
            className="md-cell"
            disabled={!!errorText || !text}
            onClick={createItemType}
          >
            Create
          </Button>
        </CardActions>
      </Card>
    );
  }

  private onChange = (value: React.ReactText) => {
    let errorText: string | undefined;
    if (value) {
      const text = String(value).trim();
      const existing = this.props.itemTypes.find(({ name }) => {
        return !name.localeCompare(text, undefined, {
          sensitivity: 'accent'
        });
      });
      if (existing) {
        errorText = `Item Type "${existing.name}" is in use.`;
      }
    }
    this.setState({ text: value, errorText });
  };

  private createItemType = () => {
    const {
      state: { text },
      props: { createItemType }
    } = this;
    createItemType((text as string).trim());
    this.setState({ text: '' });
  };

  private createListItems({ itemTypes }: Props) {
    this.setState({
      listItems: itemTypes.map(({ name }, index) => (
        <ListItem primaryText={name} key={`${index}:${name}`} />
      ))
    });
  }
}
