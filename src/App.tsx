import { useEffect } from "react";

const fetchToken = async () => {
  try {
    const result = await fetch('https://zoom.us/oauth/token', {
      mode: 'cors',
      method: 'POST',
      body: JSON.stringify({
        grant_type: "account_credentials",
        account_id: import.meta.env.VITE_ACCOUNT_ID,
      }),
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Authorization": `Basic ${btoa(import.meta.env.VITE_CLIENT_ID)}:${import.meta.env.VITE_CLIENT_SECRET}`,
        "Access-Control-Allow-Origin": "*",
      }
    })
    const data = result.json()
    console.log(data)
  } catch (error) {
    if(error instanceof Error) {
      throw error
    }
  }
}

function App() {
  useEffect(() => {
    const getToken = async () => {
      const token = await fetchToken()
      return token
    }
    const token = getToken()
    console.log("token", token)
  }, [])

  return (
    <>

    </>
  )
}

export default App
