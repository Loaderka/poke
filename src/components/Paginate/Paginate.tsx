import React from "react";
import {IPaginateProps} from '../../types'


export class Paginate extends React.Component<IPaginateProps, {}> {
  constructor({ page, totalPages, handlePagination }: IPaginateProps) {
    super({ page, totalPages, handlePagination });
  }

  componentDidMount = () => {
    this.props.handlePagination(1);
  }

  render() {
    const { totalPages } = this.props;
    const { handlePagination } = this.props;
    const { page } = this.props;
    return (
      <div className='pagination'>
        <div className='pagination-wrapper'>
          {page !== 1 && (
            <button
              onClick={() => handlePagination(page - 1)}
              type="button"
              className='page-item sides'
            >
              &lt;
            </button>
          )}
          <div className='pagination-pages'>
            <button
              onClick={() => handlePagination(1)}
              type="button"
              className={page === 1 ? 'page-item active' : 'page-item'}
            >
              {1}
            </button>
            {page > 3 && <span className='separator'>...</span>}
            {page === totalPages && totalPages > 3 && (
              <button
                onClick={() => handlePagination(page - 2)}
                type="button"
                className='page-item'
              >
                {page - 2}
              </button>
            )}
            {page > 2 && (
              <button
                onClick={() => handlePagination(page - 1)}
                type="button"
                className='page-item'
              >
                {page - 1}
              </button>
            )}
            {page !== 1 && page !== totalPages && (
              <button
                onClick={() => handlePagination(page)}
                type="button"
                className='page-item active'
              >
                {page}
              </button>
            )}
            {page < totalPages - 1 && (
              <button
                onClick={() => handlePagination(page + 1)}
                type="button"
                className='page-item'
              >
                {page + 1}
              </button>
            )}
            {page === 1 && totalPages > 3 && (
              <button
                onClick={() => handlePagination(page + 2)}
                type="button"
                className='page-item'
              >
                {page + 2}
              </button>
            )}
            {page < totalPages - 2 && <span className='separator'>...</span>}
            <button
              onClick={() => handlePagination(totalPages)}
              type="button"
              className={page === totalPages ? 'page-item active' : 'page-item'}
            >
              {totalPages}
            </button>
          </div>
          {page !== totalPages && (
            <button
              onClick={() => handlePagination(page + 1)}
              type="button"
              className='page-item sides'
            >
              &gt;
            </button>
          )}
        </div>
      </div>
    );
  }
}
