import { useEffect, useState } from "react"

export default function LastSalesPage() {


  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

  
  
  useEffect(() => {
    setIsLoading(true)
    fetch('https://nextjs-demo-c6e7e-default-rtdb.asia-southeast1.firebasedatabase.app/Sales.json')
      .then((response) => response.json())
      .then((data) => {
        const transformedData = [];
        for (let key in data) {
          transformedData.push({ id: key, username: data[key].username, volume: data[key].volume })
        }
        setSales(transformedData)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return <p>Loading....</p>
  }

  if (!sales) {
    return <p>No sales yet</p>
  }

  return (<ul>
    {sales.map((sale) => <li key={sale.id}>{sale.username} - ${sale.volume}</li>)}
  </ul>)
}