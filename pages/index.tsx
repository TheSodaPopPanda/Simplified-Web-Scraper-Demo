import { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'

const homePage: NextPage = () => {
  const [state, setState] = useState<any>({
    url: '',
    loading: false,
    data: {}
  })

  const urlRef = useRef<string | null>(null)
  useEffect(() => {
    urlRef.current = state.url
  }, [state.url])

  const scanSite = async (rawUrl:string) => {
    // const url = new URL(raw_url)

    fetch('/api/scan?site=' + rawUrl)
      .then(response => response.json())
      .then((json) => {
        console.log(json)
        setState({
          ...state,
          loading: false,
          data: json
        })
      })
      .catch((err) => {
        console.log(err)
        setState({
          ...state,
          loading: false
        })
      })
  }

  return <div>
    <Head>
      <title>Simplified Web Scraper Demo</title>
      <meta name="viewport" content="width=device-width, initial-scale=1"/>
      <meta name="description" content="..."/>
      {/* Social Embed */}
      <meta property="og:title" content='Simplified-Web-Scraper-Demo'/>
      <meta property="og:description" content='...'/>
      <meta property="og:type" content="website" />
      {/* <meta property="og:image" content='/social_image.jpg' /> */}
      {/* <meta property="og:url" content='https://example.com/'/> */}
      <meta name="twitter:card" content="summary_large_image"/>
      <meta property="og:site_name" content="Simplified-Web-Scraper-Demo"/>
    </Head>
    <div>
      <div className="min-h-screen flex flex-col w-full bg-theme-accent-bg">
          <h1 className='font-bold pb-20 px-4 pt-32 text-center text-4xl md:text-6xl text-theme-text-alt drop-shadow-sm'>
            Simplified Web Scraper Demo
          </h1>
          <div className='mx-auto pt-20'>
            <p className='py-4 text-theme-text-alt '>
              Enter site url (content rich pages work best)
            </p>
            <div className='flex flex-col md:flex-row'>
              <input
                type="text"
                placeholder='site url'
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
                  setState({
                    ...state,
                    loading: true
                  })
                  scanSite(state.url)
                }}
              >
                Scrap
              </button>
            </div>
          </div>

          <div className='grid-cols-1 md:grid-cols-2 max-w-[90%] min-w-[800px] mx-auto p-5 mt-32 rounded bg-theme-main-bg'>
            <div>
              <ul>
                <li>
                   <span className='font-semibold text-theme-accent-bg mr-2'>Phone:</span>
                   {state.data && state.data.phones
                     ? state.data.phones.map((ele:string, index:number) => {
                       return <span
                              key={'phones' + index}
                              className='text-theme-text-alt bg-theme-accent p-1 rounded-md'
                            >{ele}</span>
                     })
                     : 'no number found'
                  }
                  </li>
                <li>
                  <span className='font-semibold text-theme-accent-bg mr-2'>Email:</span>
                  {state.data && state.data.emails
                    ? state.data.emails.map((ele:string, index:number) => {
                      return <span
                              key={'emails' + index}
                              className='text-theme-text-alt bg-theme-accent p-1 rounded-md'
                            >{ele}</span>
                    })
                    : 'no email found'
                  }
                </li>
                <li>
                  <span className='font-semibold text-theme-accent-bg mr-2'>Industry:</span>
                  {state.data?.industry || 'unknown'}
                </li>
              </ul>
            </div>
            <div>
              <hr className='my-6'/>
              <p className='font-semibold text-theme-accent-bg mr-2 '>Raw Json data returned</p>
              <pre className='font-mono bg-theme-accent/20 rounded mt-2 p-1'>
                {JSON.stringify(state.data, null, 2) }
              </pre>
            </div>
          </div>
      </div>
      <div
        className='fixed top-0 left-0 w-full h-full bg-theme-accent-bg/60 z-100 transition-opacity'
        style={{
          display: (state.loading ? 'block' : 'none'),
          opacity: (state.loading ? '1' : '0')
        }}
      >
        <div className='text-center bg-theme-text-alt mx-auto mt-[20%] rounded shadow-lg w-[20rem]'>
          <div className='mx-auto pt-10 pb-4 w-fit'>
            <svg
              role="status"
              className="w-8 h-8 mr-2 text-theme-accent/20 animate-spin fill-theme-accent"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
          </div>
          <p className='pb-6'>Loading...</p>
        </div>
      </div>
    </div>
  </div>
}

export default homePage
