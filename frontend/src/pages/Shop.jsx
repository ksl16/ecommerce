import React, { useState, useEffect } from "react";

import { useGetLimitedProductsQuery } from "../services/product";
import ReactPaginate from "react-paginate";
import BreadCrumbs from "../components/BreadCrumbs";
import Shopfilter from "../components/Shopfilter";

import {
  Footer,
  TopHeader,
  Header,
  SidebarCategories,
  Navigation,
} from "../index";
import AllProductItem from "../components/AllProductItem";

const Shop = () => {
  const [num, setNum] = useState(0);
  const [limit] = useState(9);
  const { data, error, isLoading } = useGetLimitedProductsQuery({ num, limit });
  const [searchterm, setSearchTerm] = useState("");
  const [sort, setSort] = useState([]);

  //console.log("sort", sort);
  useEffect(() => {
    setSort(data);
  }, [data]);

  const handlePageClick = (data) => {
    let newPage = data.selected + 1;
    //console.log("click", currentPage);
    setNum(newPage);
  };
  //console.log("data", data);

  const ascSort = async () => {
    //alert("hello");
    const result = await sort
      .slice()
      .sort((a, b) => a.title.localeCompare(b.title));
    //console.log(sort);
    setSort(result);
  };
  const descSort = async () => {
    //alert("hello");
    const result = await sort
      .slice()
      .sort((a, b) => b.title.localeCompare(a.title));
    //console.log(sort);
    setSort(result);
  };
  const lowSort = async () => {
    //alert("hello");
    const result = await sort.slice().sort((a, b) => a.price - b.price);
    //console.log(result);
    setSort(result);
  };
  const highSort = async () => {
    //alert("hello");
    const result = await sort.slice().sort((a, b) => b.price - a.price);
    //console.log(result);
    setSort(result);
  };

  return (
    <>
      <div className="container-fluid">
        <TopHeader />
        <Header />
      </div>

      <div className="container-fluid">
        <div className="row border-top px-xl-5">
          <SidebarCategories />
          <div className="col-lg-9">
            <Navigation />
          </div>
        </div>
      </div>

      <div className="container-fluid bg-secondary mb-5">
        <BreadCrumbs pageTitle="Our Shop" mainPage="Home" subPage="Shop" />
      </div>

      <div className="container-fluid pt-5">
        <div className="row px-xl-5">
          <div className="col-lg-3 col-md-12">
            <Shopfilter />
          </div>

          <div className="col-lg-9 col-md-12">
            <div className="row pb-3">
              <div className="col-12 pb-1">
                <div className="d-flex align-items-center justify-content-between mb-4">
                  <form>
                    <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        value={searchterm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <div className="input-group-append">
                        <span className="input-group-text bg-transparent text-primary">
                          <i className="fa fa-search"></i>
                        </span>
                      </div>
                    </div>
                  </form>
                  <div className="dropdown ml-4">
                    <button
                      className="btn border dropdown-toggle"
                      type="button"
                      id="triggerId"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      Sort by
                    </button>
                    <div className="dropdown-menu dropdown-menu-right">
                      <button onClick={lowSort} className="dropdown-item">
                        Low to high
                      </button>
                      <button onClick={highSort} className="dropdown-item">
                        High to low
                      </button>
                      <button onClick={ascSort} className="dropdown-item">
                        ASC
                      </button>
                      <button onClick={descSort} className="dropdown-item">
                        DESC
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {error ? (
                <>Oh no, there was an error</>
              ) : isLoading ? (
                <>Loading...</>
              ) : (
                <AllProductItem searchterm={searchterm} data={sort} />
              )}

              <div className="col-12 pb-1">
                <ReactPaginate
                  nextLabel="&raquo;"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={3}
                  pageCount={15}
                  previousLabel="&laquo;"
                  renderOnZeroPageCount={null}
                  containerClassName="pagination justify-content-center mb-3"
                  pageClassName="page-item"
                  pageLinkClassName="page-link"
                  nextClassName="page-item"
                  previousClassName="page-item"
                  previousLinkClassName="page-link"
                  nextLinkClassName="page-link"
                  activeClassName="active"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Shop;
