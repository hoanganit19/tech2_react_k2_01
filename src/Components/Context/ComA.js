import React, { Component, createContext } from 'react'
import ComB from './ComB'
import ComC from './ComC';

/*
Context API:
- Đối tượng context
- Provider => Gửi dữ liệu
- Consumer => Nhận dữ liệu
*/

export const MyContext = createContext();

export class ComA extends Component {
  render() {
    const data = {
        title: 'Hoàng An',
        content: 'Hoàng An Unicode',
        author: 'Tech2'
    }
    return (
        <MyContext.Provider value={data}>
            <ComB />
            <ComC />
        </MyContext.Provider>
    )
  }
}

export default ComA

/*
TodoList
- Hiển thị công việc
- Thêm công việc
- Sửa công việc
- Xoá công việc
- Lọc
*/