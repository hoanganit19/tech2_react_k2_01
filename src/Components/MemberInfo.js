import React from "react";
import Post from "./Post";

export default function MemberInfo(props) {

  const { info, images} = props;  
  const { name, email, phone } = info;

  const imagesJsx = images.map(({ link, width, height, alt }, index) => {
    const attributes = {
      src: link,
    };

    if (width !== undefined) {
      attributes.width = width;
    }

    if (height !== undefined) {
      attributes.height = height;
    }

    if (alt !== undefined) {
      attributes.alt = alt;
    }

    return (
      <p key={index}>
        <img {...attributes} />
      </p>
    );
  });

 // console.log(props);

  return (
    <div style={{ margin: "3%" }}>
      <h2>Thông tin cá nhân</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>
      <p>Phone: {phone}</p>

      <h2>Hình ảnh</h2>
      {imagesJsx}

      <Post {...props}/>
    </div>
  );
}
