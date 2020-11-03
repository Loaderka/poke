import React from 'react';
import { PokeInfo } from './components/PokeInfo/PokeInfo'
import { SearchBar } from './components/SearchBar/SearchBar'
import { Paginate } from './components/Paginate/Paginate'
import {IPokeState} from './types'

class App extends React.Component<{}, IPokeState> {
  constructor(){
    super({});
    this.state = {
      data: [],
      filter: '',
      page: 1,
      caughtPokes: [],
    }
    this.getPokes = this.getPokes.bind(this);
    this.toggleCought = this.toggleCought.bind(this);
  }

  getPokes = (from: number, count: number) => {
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${from}&limit=${count}`)
    .then(r => r.json())
    .then(data => 
      data.results.map( (obj: {name: string, id: number, url: string}) => 
      this.setState(prev => ({
      data: [...prev.data, {name: obj.name, id: obj.url.slice(34, -1), url: obj.url}]
    }))))
  }

  handlePageClick = (updatePage: number) => {
    this.setState({page: updatePage});
  }

  handleSearch = (value: string) => {
    this.setState({
      filter: value,
      page: 1,
    })
  }

  toggleCought = (id: string) => {
    this.setState(prev => {
      if (prev.caughtPokes.includes(id)) {
        return {caughtPokes: prev.caughtPokes.filter(el => el !== id)};
      } else {
        return {caughtPokes: [...prev.caughtPokes, id]};
      }
    })
  }

  componentDidMount = () => {
    this.getPokes(0, 150);
  }
  
  render() {
    const {data} = this.state;
    const {page} = this.state;
    const PAGE_SIZE = 15;
    const pageCount = Math.floor(data.length / PAGE_SIZE) - 1;
    const displayData = data.filter(poke => poke.name.toLowerCase().includes(this.state.filter.toLowerCase())).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

    return (
      <React.Fragment>
      <header>
        <h3>Поймано покемонов</h3>
        <div className="counter">{this.state.caughtPokes.length}</div>
      </header>
      <SearchBar
      onSearch={this.handleSearch}
      />
      <div className="container">
        <div className="wrapper">
          {displayData.map(poke => (
            <PokeInfo
              name={poke.name}
              id={poke.id}
              url={poke.url}
              caught={this.state.caughtPokes.includes(poke.id)}
              toggleCought={this.toggleCought}
              key={poke.id}
            />
            ))}
        </div>
        {data.length > PAGE_SIZE
        ?  <Paginate
            page={page}
            totalPages = {pageCount}
            handlePagination = {this.handlePageClick}
          />
        : null
      }
      </div>
      </React.Fragment>
    )
  }
}

export default App;