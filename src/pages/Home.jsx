import React from 'react'
import NavBar from '../sections/NavBar'
import Hero from '../sections/Hero';
import FeatureCardList from '../components/FeatureCardList';


export const Home = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <FeatureCardList />
    </>
  )
}

export default Home