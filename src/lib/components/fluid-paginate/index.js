import * as actions from './fluid.info';

import FluidFunc from 'fluid-func';
import PropTypes from 'prop-types';
import React from 'react';

export class FluidPaginate extends React.Component {

  static next(paginatorName) { return FluidFunc.start(`${actions.PAGINATOR_NEXT}${paginatorName}`); }
  static previous(paginatorName) { return FluidFunc.start(`${actions.PAGINATOR_PREVIOUS}${paginatorName}`); }
  static first(paginatorName) { return FluidFunc.start(`${actions.PAGINATOR_FIRST}${paginatorName}`); }
  static last(paginatorName) { return FluidFunc.start(`${actions.PAGINATOR_LAST}${paginatorName}`); }
  static refresh(paginatorName) { return FluidFunc.start(`${actions.PAGINATOR_REFRESH}${paginatorName}`, { page: 1 }); }
  static goToPage(paginatorName, page) { return FluidFunc.start(`${actions.PAGINATOR_REFRESH}${paginatorName}`, { page }); }
  constructor(props) {
    super(props);
    this.state = {};
    this.thisOnNext = this.onNext.bind(this);
    this.thisOnPrevious = this.onPrevious.bind(this);
    this.thisOnFirst = this.onFirst.bind(this);
    this.thisOnLast = this.onLast.bind(this);
    this.thisOnRefresh = this.onRefresh.bind(this);

    FluidFunc
      .create(`${actions.PAGINATOR_NEXT}${props.name}`)
      .onStart(this.thisOnNext);
    FluidFunc.create(`${actions.PAGINATOR_PREVIOUS}${props.name}`)
      .onStart(this.thisOnPrevious);
    FluidFunc.create(`${actions.PAGINATOR_FIRST}${props.name}`)
      .onStart(this.thisOnFirst);
    FluidFunc.create(`${actions.PAGINATOR_LAST}${props.name}`)
      .onStart(this.thisOnLast);
    FluidFunc.create(`${actions.PAGINATOR_REFRESH}${props.name}`)
      .spec('page', { require: true })
      .cache(props.cacheTimeout)
      .onStart(this.thisOnRefresh);
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.total !== nextProps.total) {
      FluidPaginate.goToPage(nextProps.page);
    }
  }
  onNext() {
    const isNext = this.hasNext();
    if (isNext) {
      const page = this.props.page + 1;
      FluidFunc.start(`${actions.PAGINATOR_REFRESH}${this.props.name}`, { page });
    }
  }
  onPrevious() {
    const isPrevious = this.hasPrevious();
    if (isPrevious) {
      const page = this.props.page - 1;
      FluidFunc.start(`${actions.PAGINATOR_REFRESH}${this.props.name}`, { page });
    }
  }
  onFirst() {
    FluidFunc.start(`${actions.PAGINATOR_REFRESH}${this.props.name}`, { page: 1 });
  }
  onLast() {
    FluidFunc.start(`${actions.PAGINATOR_REFRESH}${this.props.name}`, { page: this.getTotalPage() });
  }
  onRefresh(parameter) {
    const page = parameter.page();
    const size = this.props.size;
    const total = this.props.total;
    const pages = this.getPages(page);
    const hasNext = this.hasNext(page);
    const hasPrevious = this.hasPrevious(page);
    this.props.onChange({ page, size, total, pages, hasNext, hasPrevious });
  }
  hasNext(page) {
    const current = (page || this.props.page) * this.props.size;
    return current < this.props.total;
  }
  hasPrevious(page) {
    const current = (page || this.props.page) * this.props.size;
    return current > this.props.size;
  }
  getTotalPage() {
    const initialTotal = this.props.total / this.props.size;
    const productOfInititalTotal = this.props.size * initialTotal;
    let addToTotalPage = 0;
    if (productOfInititalTotal < this.props.total) {
      addToTotalPage = 1;
    }
    return initialTotal + addToTotalPage;
  }
  getPages(newPage) {
    const totalPage = this.getTotalPage();
    const pages = [];
    for (let page = 1; page <= totalPage; page++) {
      pages.push(this.createPage(page, page === newPage));
    }
    return pages;
  }
  createPage(page, selected) {
    return {
      page,
      selected,
      onClick: () => {
        return FluidPaginate.goToPage(this.props.name, page);
      }
    };
  }
  render() {
    const className = `paginator ${this.props.className || ''}`;
    return (<div
      style={this.props.style}
      name={this.props.name} className={className}>{this.props.children}</div>);
  }
}

FluidPaginate.propTypes = {
  onChange: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element, PropTypes.array
  ]),
  name: PropTypes.string.isRequired,
  total: PropTypes.number.isRequired,
  size: PropTypes.number,
  page: PropTypes.number,
  cacheTimeout: PropTypes.number,
  className: PropTypes.string,
  style: PropTypes.object
};

FluidPaginate.defaultProps = {
  size: 25,
  page: 1,
  cacheTimeout: 3000
};
