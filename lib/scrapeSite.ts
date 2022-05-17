import { industryData } from '../data/industryTypeData.json'

interface IndustryDataObj {
  [key: string]: string[] | undefined
}

export const scrapeData = async (url:string, existingData:any) => {
  const industryDataObj:IndustryDataObj = industryData

  const response = await fetch(url, { mode: 'no-cors' })
    .catch()

  if (!response) {
    console.error('no response')
    console.log(response)
    return existingData
  }
  // const body = await (await response.text()).toLowerCase().replace('-', ' ')
  const body = await response.text()
  console.log('body')
  console.log(body)
  // emails
  const emails = existingData.emails || []
  const foundEmails = body.match(/[a-z0-9-.]+@[a-z0-9-.]+\.\w+/) || []
  for await (const email of foundEmails) {
    if (!emails.includes(email)) {
      emails.push(email)
    }
  }

  // phone numbers
  const phones = existingData.emails || []
  const foundPhones = body.match(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/) || []
  for await (const phone of foundPhones) {
    if (!phones.includes(phone)) {
      phones.push(phone)
    }
  }

  const industryGuessValues = existingData.industryGuessValues || {}
  for await (const industryName of Object.keys(industryDataObj)) {
    const regexWordsJoined = industryDataObj[industryName]?.join('|')
    const occurrences = body.match(new RegExp(`/(${regexWordsJoined})/g`)) || []
    industryGuessValues[industryName] = occurrences.length
  }

  let category = existingData.category || ''
  const currentValue = 0
  for await (const industryName of Object.keys(industryGuessValues)) {
    const value = industryGuessValues[industryName]
    if (value > 5 && value > currentValue) {
      category = industryName
    }
  }
  return {
    ...existingData,
    emails,
    phones,
    category,
    industryGuessValues
  }
}
