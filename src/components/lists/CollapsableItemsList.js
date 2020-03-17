import React, { Component } from 'react';

export default class CollapsableItemsList extends Component {
  constructor(props) {
    super(props);
    this.state = { items: {}, open: null };
  }

  async componentDidUpdate() {
    if (Object.keys(this.state.items).length !== this.props.children.length) {
      let itemsData = {};
      React.Children.forEach(this.props.children, (child) => (itemsData[child.props.id] = { collapsed: true }));
      console.log(itemsData);
      this.setState({
        items: itemsData,
      });
    }
  }

  async componentDidMount() {
    if (Object.keys(this.state.items).length !== this.props.children.length) {
      let itemsData = {};
      React.Children.forEach(this.props.children, (child) => (itemsData[child.props.id] = { collapsed: true }));
      console.log(itemsData);
      this.setState({
        items: itemsData,
      });
    }
  }

  open = (id) => {
    const items = { ...this.state.items };
    const { open } = this.state;
    if (open) {
      items[open].collapsed = true;
    }
    items[id].collapsed = false;

    this.setState({ items, open: id });
  };

  close = (id) => {
    const items = { ...this.state.items };
    const { open } = this.state;
    if (open) {
      items[open].collapsed = true;
    }
    items[id].collapsed = true;

    this.setState({ items, open: id });
  };

  render() {
    return (
      <ul className='list_no-type'>
        {React.Children.map(this.props.children, (child) => (
          <li key={child.props.id}>
            {React.cloneElement(child, {
              open: this.open,
              close: this.close,
              collapsed: this.state.items[child.props.id] && this.state.items[child.props.id].collapsed,
            })}
          </li>
        ))}
      </ul>
    );
  }
}
