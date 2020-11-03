export interface IPokeState {
  data: IPokeData[];
  filter: string,
  page: number,
  caughtPokes: string[],
}

export interface IPokeData {
  name: string,
  id: string,
  url: string,
}

export interface ISearchBarProps {
  onSearch: (value: string) => void,
}

export interface IPokeInfoProps {
  name: string,
  id: string,
  url: string,
  caught: boolean,
  toggleCought: (id: string) => void,
}

export interface IPokeInfoState {
  open: boolean,
  info: IPokeInfo,
}

interface IPokeInfo {
  height: number,
  weight: number,
}

export interface IPaginateProps {
  page: number;
  totalPages: number;
  handlePagination: (updatePage: number) => void;
}