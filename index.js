const email = document.getElementById("email-preview")

async function fetchChatWorker() {
    const messages = [
        {
            role: 'system',
            content: 'You are Braze customer engagment platform email expert'
        },
        {
            role: 'user',
            content: `Write me email copy for the video editing platform Clipchamp presuading me to try it. It needs to be in the following format:
            
            Heading: 10 words of less
            Body copy: 60 words or less
            CTA: 5 words or less
            
            The copy should be upbeat, engaging and aimed at novice information workers. It should also include specific references to Clipchamp features to avoid sounding generic.
            Do not include introductions such as "hello there"`
        }
    ]
    
    try {
        const url = 'https://openai-api-worker.davidworeilly.workers.dev'
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messages)
        })
        const data = await response.json()
        
        if (!response.ok) {
            throw new Error(`Worker Error: ${data.error}`)
        }
        console.log(data.content)
        const emailToSplit = data.content
        const output = emailToSplit.split(/: |\n/)
        console.log(output)
        
        renderEmail(output)

    } catch (err) {
        console.error(err.message)
    }
}

fetchChatWorker()

function renderEmail(elements) {
    const headingElement = document.getElementById("heading-el");
    const bodyElement = document.getElementById("body-el");
    const CTAElement = document.getElementById("CTA-el");
    headingElement.textContent = elements[1];
    bodyElement.textContent = elements[4];
    CTAElement.textContent = elements[7];
}
