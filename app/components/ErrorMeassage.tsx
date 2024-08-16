import React, { PropsWithChildren, ReactNode } from 'react'
import { Text } from '@radix-ui/themes'


const ErrorMeassage = ({ children }: PropsWithChildren) => {
    if (!children) return null
    
    return (

    <Text color="red"  >{children}</Text>
  )
}

export default ErrorMeassage