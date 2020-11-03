import React from 'react';
import {IPokeInfoProps, IPokeInfoState} from '../../types'

export class PokeInfo extends React.Component<IPokeInfoProps, IPokeInfoState> {
  constructor({ name, id, url, caught, toggleCought } : IPokeInfoProps) {
    super({ name, id, url, caught, toggleCought });
    this.state = {
      open: false,
      info: {
        height: 0,
        weight: 0,
      },
    }
    this.handleClick = this.handleClick.bind(this);
    this.getPokeSized = this.getPokeSized.bind(this);
  }

  handleClick = () => {
    this.props.toggleCought(this.props.id);
  }

  getPokeSized = () => {
    fetch(`${this.props.url}`)
    .then(r => r.json())
    .then(obj => this.setState({
      open: true,
      info: {height: obj.height, weight: obj.weight}
    }));
  }

  render() {
    const picture = `https:raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${this.props.id}.png`
    const {open} = this.state;
    const {info} = this.state;

    return (
      <div className='pokemon' style={this.props.caught ? {backgroundColor: '#ff2400'} : {backgroundColor: '#24a319'}}>
        <div className='pokemon__content'>
          <h3>{this.props.name}</h3>
          <img src={picture} alt=""/>
        </div>
        <div className='pokemon__get-info'>
          <button className='btn-catch' onClick={this.handleClick}>{this.props.caught ? 'Отпустить' : 'Поймать'}</button>
          <button className='btn-show' onClick={this.getPokeSized} style={open ? {display: 'none'} : {display: "inline-block"}}>Показать размеры</button>
          <div className='pokemon__sizes' style={open ? {display: 'block'} : {display: "none"}}>
            <div>Высота: {info.height}</div>
            <div>Вес: {info.weight}</div>
          </div>
        </div>
      </div>
    )
  }
}