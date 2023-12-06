"use client"
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
export default function Home() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/members").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])


  return (
    <main>
      <section>
        <div className='content-center items-center justify-center m-5'>
          <p className='text-center secondary-text'>
            HOLA GENTES
          </p>
        </div>
      </section>
    </main>
  );
}
