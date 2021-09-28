import { Children } from 'react';
import { cloneElement, isValidElement } from 'react';
import { useState } from 'react'

export default function StateWrapper({children}) {

  const [hostId, setHostId] = useState('');
  const [roomId, setRoomId] = useState('');
  // const []

  const childrenWithProps = Children.map(children, (child) => {
    if(isValidElement(child)) {
      return cloneElement(child, { hostId });
    }
    return child;
  })

  return <>
    {/* {props.children.map((child) => {
      return child(hostId)
    })} */}
    {childrenWithProps}
  </>
}