export function getDataFromDoc(doc) {
    const data = doc.data()
    data.id = doc.id
    return data
  }
  // lay du lieu tu get many document
  export function getDataFromDocs(data) {
    // const docs = data.docs
    // const listRes = []
    // for (const item of docs) {
    //   listRes.push(getDataFromDoc(item))
    // }
    // return listRes
    return data.docs.map(getDataFromDoc)
  }

  export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value) )
  }

  export function getItemToLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
  }

  export  function convertDate(dateStr){
    const date = new Date(dateStr)
    const day = validDate(date.getDate())
    const month = validDate(date.getMonth() + 1)
    const year = date.getFullYear()
    const hour = validDate(date.getHours())
    const minutes = validDate(date.getMinutes())
    return `${day}/${month}/${year} - ${hour}:${minutes}`
  }

  function validDate(number) {
    return number<10 ? '0' +  number : number;
  }