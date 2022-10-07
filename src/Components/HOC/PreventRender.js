import React from 'react'

export default function PreventRender(ParentComponent) {
  
    return class extends React.Component{
        constructor(props){
            super(props);
        }

        shouldComponentUpdate(nextProps){
            const currentPropsJs = JSON.stringify(this.props);
            const nextPropsJs = JSON.stringify(nextProps);
            
            if (Object.keys(this.props).length && currentPropsJs!=nextPropsJs){
                return true;
            }

            return false;
        }

        render(){
            return <ParentComponent {...this.props}/>
        }
    }

}
