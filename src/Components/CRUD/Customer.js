import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Customer.scss";
import config from "../../config.json";
import HttpClient from "./HttpClient";
import Modal from "react-bootstrap/Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import Color from "../HOC/Color";

export class Customer extends Component {
  constructor(props) {
    super(props);

    console.log(props);

    this.state = {
      customers: [],
      filters: {
        status: "all",
        keyword: "",
      },
      paginate: {
        currentPage: 1,
        totalPage: 0,
      },

      modal: {
        isShow: false,
      },

      form: {
        name: "",
        email: "",
        phone: "",
        status: 0,
      },

      errors: {
        name: {},
        email: {},
        phone: {},
        status: {},
      },

      currentId: 0,
    };

    this.customerApi = config.SERVER_API + "/customers";
    this.perPage = config.PER_PAGE;
    this.client = new HttpClient();
  }

  getCustomers = async (filters = {}) => {
    const { currentPage } = this.state.paginate;

    let searchApi = `${this.customerApi}?_page=${currentPage}&_limit=${this.perPage}&_sort=id&_order=desc`;

    if (Object.keys(filters).length) {
      const params = new URLSearchParams(filters).toString();

      //searchApi = this.customerApi + "&" + params;

      searchApi = `${this.customerApi}?_page=${currentPage}&_limit=${this.perPage}&${params}&_sort=id&_order=desc`;
    }

    const clientResult = await this.client.get(searchApi);
    const totalCount = clientResult.headers.get("x-total-count");
    const totalPage = Math.ceil(totalCount / this.perPage);

    const paginate = { ...this.state.paginate };
    paginate.totalPage = totalPage;

    clientResult.json().then((customers) => {
      this.setState({
        customers: customers,
        paginate: paginate,
      });
    });
  };

  renderPaginate = () => {
    // console.log("paginate");
    const { totalPage, currentPage } = this.state.paginate;

    let pageItemJsx = [];

    for (let i = 1; i <= totalPage; i++) {
      pageItemJsx.push(
        <li
          key={i}
          className={`page-item${currentPage == i ? " active" : null}`}
        >
          <a
            className="page-link"
            href="#"
            onClick={(e) => {
              e.preventDefault();
              this.goPaginate(i);
            }}
          >
            {i}
          </a>
        </li>
      );
    }

    const jsx = (
      <nav className="d-flex justify-content-end">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link" href="#">
              Tr?????c
            </a>
          </li>
          {pageItemJsx}
          <li className="page-item">
            <a className="page-link" href="#">
              Sau
            </a>
          </li>
        </ul>
      </nav>
    );

    return jsx;
  };

  //IIFE

  updateCurrentPage = (paginate) => {
    this.setState({
      paginate: paginate,
    });
  };

  // goPaginate = async (page) => {
  //   const paginate = {...this.state.paginate};
  //   paginate.currentPage = page;

  //   await this.updateCurrentPage(paginate);

  //   // await (() => {
  //   //   this.setState({
  //   //     paginate: paginate
  //   //   })
  //   // })()

  //   this.getCustomers();
  // }

  goPaginate = (page) => {
    const paginate = { ...this.state.paginate };
    paginate.currentPage = page;

    this.setState({
      paginate: paginate,
    });
  };

  componentDidMount = () => {
    const filtersObj = this.getFilterObj();
    this.getCustomers(filtersObj);
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { currentPage: prevCurrentPage } = prevState.paginate;

    const { currentPage } = this.state.paginate;

    if (currentPage != prevCurrentPage) {
      const filtersObj = this.getFilterObj();

      this.getCustomers(filtersObj);
    }

    // console.log('Update...');
    //?????c bi???t l??u ?? ph???i check prevState v?? currentState => N???u kh??c nhau th?? s??? g???i API
  };

  getFilterObj = () => {
    const { filters } = this.state;

    let { status, keyword } = filters;

    const filtersObj = {};

    if (status === "active" || status === "inactive") {
      status = status === "active" ? 1 : 0;

      filtersObj.status = status;
    }

    if (keyword !== "") {
      filtersObj.q = keyword;
    }

    return filtersObj;
  };

  handleFilter = (e) => {
    e.preventDefault();
    const filtersObj = this.getFilterObj();

    this.getCustomers(filtersObj);
  };

  handleChange = (e) => {
    const filters = { ...this.state.filters };
    filters[e.target.name] = e.target.value;

    this.setState({
      filters: filters,
    });
  };

  //H??m ki???m trea email h???p l???
  isEmail = (email) => {
    const pattern = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    return pattern.test(email);
  };

  //H??m ki???m tra s??? ??i???n tho???i h???p l???
  isPhone = (phone) => {
    const pattern = /^(0|\+84)\d{9}$/;
    return pattern.test(phone);
  };

  openModalAdd = () => {
    //e.preventDefault();

    const modal = { ...this.state.modal };
    modal.isShow = true;
    this.resetForm();
    this.setState({ modal: modal, currentId: 0 });
  };

  closeModalAdd = () => {
    const modal = { ...this.state.modal };
    modal.isShow = false;
    this.setState({ modal: modal });
  };

  handleSubmitAdd = (isAdd = false) => {
    let { name, email, phone, status } = this.state.form;

    const { currentId } = this.state;

    status = parseInt(status);

    const errors = {
      name: {},
      email: {},
      phone: {},
      status: {},
    };

    if (name === "") {
      errors.name.required = "Vui l??ng nh???p t??n";
    } else if (name.length < 5) {
      errors.name.min = "T??n ph???i t??? 5 k?? t??? tr??? l??n";
    }

    if (email === "") {
      errors.email.required = "Vui l??ng nh???p email";
    } else if (!this.isEmail(email)) {
      errors.email.email = "Vui l??ng nh???p email h???p l???";
    }

    if (phone === "") {
      errors.phone.required = "Vui l??ng nh???p s??? ??i???n tho???i";
    } else if (!this.isPhone(phone)) {
      errors.phone.phone = "Vui l??ng nh???p s??? ??i???n tho???i h???p l???";
    }

    if (status !== 0 && status !== 1) {
      errors.status.required = "Tr???ng th??i kh??ng h???p l???";
    }

    this.setState({
      errors: errors,
    });

    if (!this.isErrors(errors)) {
      if (this.state.currentId == 0) {
        //Th??m d??? li???u

        this.client
          .post(this.customerApi, {
            name: name,
            email: email,
            phone: phone,
            status: status,
          })
          .then((response) => response.json())
          .then((response) => {
            if (response !== "") {
              toast.success("Th??m kh??ch h??ng th??nh c??ng");
              this.resetForm();
              this.getCustomers();

              if (!isAdd) {
                this.closeModalAdd();
              }
            }
          });
      } else {
        this.client
          .put(
            this.customerApi,
            {
              name: name,
              email: email,
              phone: phone,
              status: status,
            },
            currentId
          )
          .then((response) => response.json())
          .then((response) => {
            if (response !== "") {
              toast.success("C???p nh???t kh??ch h??ng th??nh c??ng");
              this.getCustomers();
              this.closeModalAdd();
            }
          });
      }
    }
  };

  getError = (fieldName) => {
    const { errors } = this.state;

    const error = errors[fieldName];

    const keys = Object.keys(error);

    return error[keys[0]];
  };

  isErrors = (errors) => {
    const keys = Object.keys(errors);

    if (keys.length) {
      const check = keys.some((key) => {
        return Object.keys(errors[key]).length > 0;
      });

      return check;
    }

    return false;
  };

  resetForm = () => {
    this.setState({
      form: {
        name: "",
        email: "",
        phone: "",
        status: 0,
      },
    });
  };

  handleChangeFormAdd = (e) => {
    const data = { ...this.state.form }; //clone object

    data[e.target.name] = e.target.value;

    this.setState({
      form: data,
    });
  };

  handleKeyboardSave = (e) => {
    const keyCode = e.keyCode;

    switch (keyCode) {
      case 114:
        this.handleSubmitAdd();
        break;

      case 115:
        this.handleSubmitAdd(true);
        break;

      default:
        break;
    }
  };

  handleGetCustomer = (customerId) => {
    const customerDetailApi = this.customerApi + "/" + customerId;
    this.client
      .get(customerDetailApi)
      .then((response) => response.json())
      .then((customer) => {
        this.openModalAdd();

        this.setState({
          form: customer,
          currentId: customerId,
        });
      });
  };

  handleDeleteCustomer = (customerId) => {
    Swal.fire({
      title: "B???n c?? ch???c ch???n?",
      text: "N???u xo?? b???n kh??ng th??? kh??i ph???c!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ok, Xo?? ??i!",
    }).then((result) => {
      if (result.isConfirmed) {
        this.client
          .delete(this.customerApi, customerId)
          .then((response) => response.json())
          .then((response) => {
            if (response !== "") {
              toast.success("Xo?? kh??ch h??ng th??nh c??ng");
              this.getCustomers();
            }
          });
      }
    });
  };

  render() {
    // console.log("re-render 2");
    const { customers, modal, form, errors, currentId } = this.state;

    const { name, email, phone, status } = form;

    const jsx = customers.map(({ id, name, email, phone, status }, index) => {
      const statusBtn = status ? (
        <button type="button" className="btn btn-success">
          K??ch ho???t
        </button>
      ) : (
        <button type="button" className="btn btn-danger">
          Ch??a k??ch ho???t
        </button>
      );

      const editBtn = (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            this.handleGetCustomer(id);
          }}
          className="btn btn-warning"
        >
          S???a
        </a>
      );

      const deleteBtn = (
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            this.handleDeleteCustomer(id);
          }}
          className="btn btn-danger"
        >
          Xo??
        </a>
      );

      return (
        <tr key={id}>
          <td><input type="checkbox" /></td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{phone}</td>
          <td>{statusBtn}</td>
          <td>{editBtn}</td>
          <td>{deleteBtn}</td>
        </tr>
      );
    });

    return (
      <div className="container">
        <h1 className="page-title">Danh s??ch kh??ch h??ng</h1>

        <a href="#" className="btn btn-primary" onClick={this.openModalAdd}>
          Th??m m???i
        </a>
        <hr />
        <form onSubmit={this.handleFilter}>
          <div className="row">
            <div className="col-3">
              <select
                name="status"
                onChange={this.handleChange}
                className="form-select"
              >
                <option value={"all"}>T???t c??? tr???ng th??i</option>
                <option value={"active"}>K??ch ho???t</option>
                <option value={"inactive"}>Ch??a k??ch ho???t</option>
              </select>
            </div>

            <div className="col-7">
              <input
                type={"search"}
                name="keyword"
                className="form-control"
                placeholder="T??? kho?? t??m ki???m..."
                onChange={this.handleChange}
              />
            </div>

            <div className="col-2 d-grid">
              <button type="submit" className="btn btn-primary">
                T??m ki???m
              </button>
            </div>
          </div>
        </form>
        <hr />
        <table className="table table-bordered">
          <thead>
            <tr>
              <th width="5%"><input type="checkbox"/></th>
              <th>T??n</th>
              <th>Email</th>
              <th>??i???n tho???i</th>
              <th>Tr???ng th??i</th>
              <th width="5%">S???a</th>
              <th width="5%">Xo??</th>
            </tr>
          </thead>
          <tbody>{jsx}</tbody>
        </table>
        <button type="button" className="btn btn-danger disabled">Xo?? ???? ch???n (0)</button>
        {this.renderPaginate()}
        <div onKeyUp={this.handleKeyboardSave}>
          <Modal
            show={modal.isShow}
            animation={true}
            onEscapeKeyDown={this.closeModalAdd}
          >
            <Modal.Header>
              <Modal.Title>Th??m kh??ch h??ng</Modal.Title>
              <button
                type="button"
                className="btn-close"
                onClick={this.closeModalAdd}
              ></button>
            </Modal.Header>
            <Modal.Body>
              {this.isErrors(errors) ? (
                <div className="alert alert-danger text-center">
                  Vui l??ng ki???m tra d??? li???u b??n d?????i
                </div>
              ) : null}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  this.handleSubmitAdd();
                }}
              >
                <div className="mb-3">
                  <label>T??n</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.getError("name") ? "is-invalid" : ""
                    }`}
                    name="name"
                    placeholder="T??n... "
                    onChange={this.handleChangeFormAdd}
                    value={name}
                  />
                  {this.getError("name") ? (
                    <div className="invalid-feedback">
                      {this.getError("name")}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>Email</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.getError("email") ? "is-invalid" : ""
                    }`}
                    name="email"
                    placeholder="Email... "
                    onChange={this.handleChangeFormAdd}
                    value={email}
                  />
                  {this.getError("email") ? (
                    <div className="invalid-feedback">
                      {this.getError("email")}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>??i???n tho???i</label>
                  <input
                    type="text"
                    className={`form-control ${
                      this.getError("phone") ? "is-invalid" : ""
                    }`}
                    name="phone"
                    placeholder="??i???n tho???i... "
                    onChange={this.handleChangeFormAdd}
                    value={phone}
                  />
                  {this.getError("phone") ? (
                    <div className="invalid-feedback">
                      {this.getError("phone")}
                    </div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label>Tr???ng th??i</label>
                  <select
                    name="status"
                    className={`form-select ${
                      this.getError("status") ? "is-invalid" : ""
                    }`}
                    onChange={this.handleChangeFormAdd}
                    value={status}
                  >
                    <option value="0">Ch??a k??ch ho???t</option>
                    <option value="1">K??ch ho???t</option>
                  </select>
                  {this.getError("status") ? (
                    <div className="invalid-feedback">
                      {this.getError("status")}
                    </div>
                  ) : null}
                </div>
                <button type="submit" className="btn btn-primary me-3">
                  L??u
                </button>
                {currentId == 0 ? (
                  <button
                    type="submit"
                    className="btn btn-primary me-3"
                    onClick={(e) => {
                      e.preventDefault();
                      this.handleSubmitAdd(true);
                    }}
                  >
                    L??u & Th??m
                  </button>
                ) : null}

                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={this.closeModalAdd}
                >
                  ????ng
                </button>
              </form>
            </Modal.Body>
          </Modal>
        </div>

        <ToastContainer />
      </div>
    );
  }
}

export default Color(Customer);

/*
C??c b?????c x??y d???ng t??nh n??ng ph??n trang
=> Ph???n 1: Render danh s??ch
1. X??c ?????nh ???????c s??? b???n ghi tr??n 1 trang (config)
2. G???i tham s??? _limit v?? _page v??o API => Gi???i h???n s??? l?????ng b???n ghi tr??n 1 trang (Render customer)

=> Ph???n 2: Render ph??n trang
3. L???y t???ng s??? b???n ghi => L???y t??? API
4. T??nh t???ng s??? trang: Math.ceil(t???ng s??? b???n ghi / s??? b???n ghi tr??n 1 trang)
5. Render danh s??ch trang
6. Chuy???n trang khi click v??o v??o s??? trang
*/
