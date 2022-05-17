import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { scrapeData } from '../lib/scrapeSite'

const homePage: NextPage = () => {
  const [state, setState] = useState({
    url: '',
    data: ''
  })

  const urlRef = useRef<string | null>(null)
  useEffect(() => {
    urlRef.current = state.url
  }, [state.url])

  const scanSite = async (rawUrl:string) => {
    // const url = new URL(raw_url)

    const data = await scrapeData(urlRef.current || '', {})
    console.log('urlRef.current')
    console.log(urlRef.current)
    console.log(data)
    setState({
      ...state,
      data: JSON.stringify(data)
    })

    // fetch('/getList')
    //   .then(response => response.json())
    //   .then((json) => {
    //     setState({
    //       ...state,
    //       data: json
    //     })
    //   })
    //   .catch(() => {})
  }

  return <div>
    <Head>
      <title>Simplified Web Scrapper Demo</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="description" content="..."/>
      {/* Social Embed */}
      <meta property="og:title" content='Simplified-Web-Scrapper-Demo'/>
      <meta property="og:description" content='...'/>
      <meta property="og:type" content="website" />
      {/* <meta property="og:image" content='/social_image.jpg' /> */}
      {/* <meta property="og:url" content='https://example.com/'/> */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta property="og:site_name" content="Simplified-Web-Scrapper-Demo"/>
    </Head>
    <div>

      <div className="h-screen flex flex-col w-full bg-theme-accent-bg">
          <h1 className='font-bold pb-20 px-4 pt-32 text-center text-4xl md:text-6xl text-theme-text-alt drop-shadow-sm'>
            Simplified Web Scrapper Demo
          </h1>
          <div className='mx-auto flex flex-col md:flex-row pt-20'>
            <input
              type="text"
              placeholder='enter site url'
              className='p-2 outline-none border-2 border-text-main hover:border-theme-accent rounded w-[20rem]'
              value={state.url}
              onChange={(e) => {
                setState({
                  ...state,
                  url: e.target.value
                })
              }}
            />
            <button
              className='px-6 mr-auto mt-4 md:mt-0 md:mr-0 w-32 md:-ml-4 py-[9px] -tracking-wider border-2 border-theme-accent hover:brightness-75 text-theme-text-alt font-semibold rounded bg-theme-accent'
              onClick={() => {
                scanSite(state.url)
              }}
            >
              Scrap
            </button>
          </div>
          <p className='text-theme-text-alt/50 font-medium text-center py-8'>enter site url or pick example site</p>
          <ul className='grid grid-cols-2 mx-auto'>
            {state.data}
            <li
              className='px-2 py-1 mx-1 my-1 rounded border-2 border-theme-text-alt/10 hover:border-theme-accent cursor-pointer'
              onClick={(e) => {

              }}
            >
              Hello world
            </li>
            <li
              className='px-2 py-1 mx-1 my-1 rounded border-2 border-theme-text-alt/10 hover:border-theme-accent cursor-pointer'
              onClick={(e) => {

              }}
            >
              Hello world
            </li>
            <li
              className='px-2 py-1 mx-1 my-1 rounded border-2 border-theme-text-alt/10 hover:border-theme-accent cursor-pointer'
              onClick={(e) => {

              }}
            >
              Hello world
            </li>
            <li
              className='px-2 py-1 mx-1 my-1 rounded border-2 border-theme-text-alt/10 hover:border-theme-accent cursor-pointer'
              onClick={(e) => {

              }}
            >
              Hello world
            </li>
          </ul>
      </div>

    </div>
  </div>
}

export default homePage
