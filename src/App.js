import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Content from "./Components/Content";
import MemberInfo from "./Components/MemberInfo";
import Products from "./Components/Products";
import ProductItem from "./Components/ProductItem";
import Tech2 from "./Components/Tech2";
import ConvertCurrency from "./Components/ConvertCurrency";
// import Counter from "./Components/Counter";
import Login from "./Components/Form/Login";
import Toggle from "./Components/Toggle/Toggle";
import Customer from "./Components/CRUD/Customer";
import Ref02 from "./Components/Ref/Ref02";
import CheckAll from "./Components/Ref/CheckAll";
import Counter from "./Components/HOC/Counter";
import ComA from "./Components/Context/ComA";

function App() {
  const content = {
    title: "Bài viết 01",
    detail: "Nội dung 1",
    author: "Hoàng An",
    time: "14:30:00",
  };

  /*
  Hiển thị thông tin của 1 user: 
  - Tên
  - Email
  - SDT

  - Hình cá nhân (Nhiều ảnh)

  - Lịch sử công việc

  => Component: MemberInfo

  - Bài viết đã đăng
  => Post

  */

  const member = {
    info: {
      name: "Hoàng An",
      email: "hoangan.web@gmail.com",
      phone: "0388875179",
    },

    images: [
      {
        link: "https://picsum.photos/500/300",
        height: 200,
        alt: "Ảnh 1",
      },

      {
        link: "https://picsum.photos/500/300",
        width: 350,
        height: 250,
      },

      {
        link: "https://picsum.photos/500/300",
        width: 400,
        height: 350,
      },
    ],

    posts: [
      {
        title: "Bài viết 1",
        content: "Nội dung 1",
      },

      {
        title: "Bài viết 2",
        content: "Nội dung 2",
      },

      {
        title: "Bài viết 3",
        content: "Nội dung 3",
      },

      {
        title: "Bài viết 4",
        content: "Nội dung 4",
      },
    ],
  };

  const products = ["Sản phẩm 1", "Sản phẩm 2", "Sản phẩm 3", "Sản phẩm 4"];

  const handleData = (data) => {
    console.log(data);
  }

  return (
    <>
      {/* <Content
        title={content.title}
        detail={content.detail}
        author={content.author}
      />
      <hr />
      <Content {...content}/> */}
      {/* <MemberInfo {...member}/> */}
      {/* <Products>
        {products.map((product, index) => (
          <ProductItem key={index} name={product} />
        ))}
      </Products> */}
      {/* <Tech2 onData={handleData}/> */}

      {/* <Customer name="Hoàng An"/>
      <hr/>
      <CheckAll /> */}
      {/* <Counter /> */}
      <ComA />
    </>
  );
}

export default App;
