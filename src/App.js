import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Content from "./Components/Content";

function App() {
  //const name = `Trung tâm Techschool`; //Có thể sẽ lấy từ api

  // const h2Style = {
  //   color: 'red',
  //   fontWeight: 'bold'
  // }

  //camelCase => Không được gọi như cách gọi Component (Giống thẻ HTML)
  // const getCourseName = (name) => {
  //   return 'Khoá học '+name;
  // }

  //PascalCase => Được phép gọi theo cách gọi của Component
  // const CourseTech2 = () => {
  //   return 'Chào mừng bạn đến với Front-End';
  // }

  const product = {
    id: 1,
    name: "Iphone 14",
    price: 1500,
    status: true,
    createAt: "2022-09-16 14:30:30",
  };
  //Bài toán => Hiển thị thông tin sản phẩm lên trình duyệt theo mẫu sau
  /*
  - ID: 1,
  - Name: Iphone 14,
  - Price: 1500$
  - Status: false => Inactive, true => Active
  */

  //let productJsx;
  // let productStatus;
  // if (product.status){
  //   productStatus = 'Active';
  // }else{
  //   productStatus = 'Inactive';
  // }

  //const {id, name, price, status, createAt} = product;

  // productJsx =
  // <>
  //   <p>ID: {id}</p>
  //   <p>Name: {name}</p>
  //   <p>Price: {price}$</p>
  //   <p>Status: {status?'Active':'Inactive'}</p>
  //   <p>Created At: {createAt}</p>
  // </>

  const getProduct = ({ id, name, price, status, createAt }) => {
    return (
      <>
        {status ? (
          <>
            <p>ID: {id}</p>
            <p>Name: {name}</p>
            <p>Price: {price}$</p>
            <p>Status: Active</p>
            <p>Created At: {createAt}</p>
          </>
        ) : null}
      </>
    );
  };

  //Bài tập: Hiển thị thông tin sản phẩm đã được kích hoạt (status=true)

  const products = [
    {
      id: 1,
      name: "Sản phẩm 1",
      price: 12000,
      status: true,
    },

    {
      id: 2,
      name: "Sản phẩm 2",
      price: 13000,
      status: false,
    },

    {
      id: 3,
      name: "Sản phẩm 3",
      price: 15000,
      status: false,
    },

    {
      id: 4,
      name: "Sản phẩm 4",
      price: 15000,
      status: true,
    },

    {
      id: 5,
      name: "Sản phẩm 5",
      price: 15000,
      status: false,
    },
  ];

  let productList;

  if (products.length){
    productList = products.map(({ id, name, price, status }, index) => {
      return (
        <tr key={id}>
          <td>{index + 1}</td>
          <td>{name}</td>
          <td>{price.toLocaleString()}$</td>
          <td>
            {status ? (
              <button className="btn btn-success">Active</button>
            ) : (
              <button className="btn btn-warning">InActive</button>
            )}
          </td>
        </tr>
      );
    });
  }else{
    productList = <tr>
      <td colSpan={4} className="text-center">
        <div className="alert alert-info text-center">Không có sản phẩm</div>
      </td>
    </tr>
  }

  
  //Bài tập: Hiển thị danh sách sản phẩm dùng vòng lặp forEach

  // const productList = [];

  // products.forEach(({id, name, price, status}) => {

  //     const productJsx =
  //     <React.Fragment key={id}>
  //       <p>ID: {id}</p>
  //       <p>Name: {name}</p>
  //       <p>Price: {price}$</p>
  //       <p>Status: {status?'Active':'Inactive'}</p>
  //     </React.Fragment>

  //     productList.push(productJsx)
  // });

  return (
    <>
      {/* <div className="container">
        <h2 className="text-center">Danh sách sản phẩm</h2>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th with="5%">#No</th>
              <th>Name</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>{productList}</tbody>
        </table>
      </div> */}
      <Header title="Header 01" hotline="Hotline 1" nav="Nav 1" content="Content 1"/>
      <Header title="Header 02" hotline="Hotline 2" nav="Nav 2"/>
      <Content />
      <Footer />
    </>
  );
}

export default App;
