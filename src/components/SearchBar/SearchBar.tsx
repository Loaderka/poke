import React from 'react';
import {ISearchBarProps} from '../../types'

export class SearchBar extends React.PureComponent<ISearchBarProps, {}> {
  constructor({onSearch}: ISearchBarProps) {
    super({onSearch});
    this.getValue = this.getValue.bind(this);
  }

  getValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.props.onSearch(e.target.value.toLowerCase());
  }

  render() {
    return (
      <div className="searchbar">
        <input
          type="text"
          className="searchbar__input"
          placeholder="Search pokes by name..."
          onChange={this.getValue}
        />
      </div>
    )
  }
}