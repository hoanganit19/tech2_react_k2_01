import React from "react";

function App() {
  // const element = React.createElement(
  //   'div',
  //   {
  //     id: 'content',
  //     className: 'content02'
  //   },
  //   React.createElement(
  //     'h1',
  //     {className: 'title'},
  //     'Học lập trình ',
  //     React.createElement(
  //       'a',
  //       {
  //         href: 'https://reactjs.techschool.vn',
  //         target: '_blank',
  //         className: 'course'
  //       },
  //       'React JS'
  //     )
  //   ),

  //   React.createElement(
  //     'h2',
  //     {className: 'sub-title'},
  //     'Trung tâm đào tạo Techschool'
  //   )
  // );

  const html = `<h3>Nội dung mẫu</h3>`;

  const name = `Trung tâm đào tạo TechSchool`;

  const contentClass = `content`;

  const styleH1 = {
     color: 'red',
     fontStyle: 'italic',
     textDecoration: 'line-through'
  }

  //font-weight => fontWeight
  //text-decoration => textDecoration
  //document.querySelector('.text').style.fontWeight='bold';

  const handleClick = (text) => {
    alert('Tech2: '+text);
  }

  const check = true;

  let h2Jsx;

  // if (check){
  //   h2Jsx = 
  //   <>
  //     <h2>FullStack Web</h2>
  //     <h2>FullStack Web</h2>
  //   </>;
  // }else{
  //   h2Jsx = <h2>Tôi không thích lập trình</h2>;
  // }

  h2Jsx = check 
  ?
  <>
    <h2>FullStack Web</h2>
    <h2>FullStack Web</h2>
  </>
  :
  <h2>Tôi không thích lập trình</h2>

  return (
    <>
      <div className={contentClass} id="content">
      <h1 
      className={"title"} 
      id="title"
      style={
        {
          color: 'red',
          fontStyle: 'italic',
          textDecoration: 'line-through'
        }
      }
      >
        Học lập trình React JS
      </h1>
      <h2 className="sub-title">{name}</h2>
      {/* <div dangerouslySetInnerHTML={{__html: html}} /> */}
      <button type={'button'} onClick={() => {
        handleClick('React JS');
      }}>Button</button>
    </div>
    <h1>Front-End Dev</h1>
    {h2Jsx}
    </>
  );
}

export default App;
