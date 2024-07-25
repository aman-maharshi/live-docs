import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div>
      <Header>
        Hi
      </Header>
      <div className='px-4 md:px-8'>
        <div className='mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae, ab!</div>
        <Button>Click me</Button>
      </div>

    </div>
  )
}

export default Home