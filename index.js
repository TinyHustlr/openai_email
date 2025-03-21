const email = document.getElementById("email-preview")

async function fetchChatWorker() {
    // const userMessage = 

    
    try {
        const url = 'https://openai-api-worker.davidworeilly.workers.dev'
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        })
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(`Worker Error: ${data.error}`)
        }
        console.log(data)
        // const emailToSplit = data.content
        // const output = emailToSplit.split(/: |\n/)
        // console.log(output)
        
        renderEmail(data)

    } catch (err) {
        console.error(err.message)
    }
}

// fetchChatWorker()

function renderEmail(elements) {
    const headingElement = document.getElementById("heading-el");
    const bodyElement = document.getElementById("body-el");
    const CTAElement = document.getElementById("CTA-el");
    headingElement.textContent = elements[1];
    bodyElement.textContent = elements[4];
    CTAElement.textContent = elements[7];
}
