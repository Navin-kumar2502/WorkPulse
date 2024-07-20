import {ThemedLayoutV2 ,ThemedTitleV2} from '@refinedev/antd'
import { FaTasks } from "react-icons/fa";
import React from 'react'
import { Header } from './header'
import { CheckSquareOutlined } from '@ant-design/icons'
const TaskManagementIcon = () => {
  return (
    <div style={{ fontSize: '18px'}}>
      <FaTasks/>
    </div>
  );
};
export const Layout = ({children}:React.PropsWithChildren) => {
  return (
      <ThemedLayoutV2
          Header={Header}
          Title={(titleProps)=><ThemedTitleV2 {...titleProps} icon={<TaskManagementIcon/>} text="WorkPulse"/>}
          >
          {children}
      </ThemedLayoutV2>
  )
}

export default Layout