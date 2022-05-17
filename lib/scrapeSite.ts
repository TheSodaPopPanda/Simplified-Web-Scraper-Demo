// import chromium from 'chrome-aws-lambda'
import puppeteer from 'puppeteer'
import { industryData } from '../data/industryTypeData.json'

interface IndustryDataObj {
  [key: string]: string[] | undefined
}

export const scrapeData = async (url:string, existingData:any) => {
  const industryDataObj:IndustryDataObj = industryData

  const browser = await puppeteer.launch()
  const page = await browser.newPage()
  await page.goto(url, {
    waitUntil: 'networkidle2'
  })
    .catch((err) => { console.log(err) })
  const body = await page.$eval('html', (e) => e.innerHTML.toLowerCase())
  await browser.close()

  // emails
  const emails = existingData.emails || []
  const foundEmails = body.match(/[a-z0-9-.]+@[a-z0-9]+\.[a-z]{1,7}/g) || []
  for await (const email of foundEmails) {
    if (!emails.includes(email) && email) {
      emails.push(email)
    }
  }

  // phone numbers
  const phones = existingData.emails || []
  const foundPhones = body.match(/(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}/) || []
  for await (const phone of foundPhones) {
    if (!phones.includes(phone) && phone) {
      phones.push(phone)
    }
  }

  const industryGuessValues = existingData.industryGuessValues || {}
  for await (const industryName of Object.keys(industryDataObj)) {
    const regexWordsJoined = industryDataObj[industryName]?.join('|')
    const regex = new RegExp(`(${regexWordsJoined})`, 'g')
    const occurrences = body.match(regex) || []
    console.log(regex)
    industryGuessValues[industryName] = occurrences.length
  }

  let industry = existingData.industry || ''
  let currentValue = 0
  for await (const industryName of Object.keys(industryGuessValues)) {
    const value = industryGuessValues[industryName]
    if (value > 4 && value > currentValue) {
      currentValue = value
      industry = industryName
    }
  }
  return {
    ...existingData,
    emails,
    phones,
    industry,
    industryGuessValues
  }
}
