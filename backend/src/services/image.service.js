// backend/src/services/image.service.js

const generateCloudflareImage = async (prompt) => {
    
    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    

    const finalAccountId = accountId ;
    const finalApiToken = apiToken;

    const MODEL = "@cf/black-forest-labs/flux-1-schnell";
    const url = `https://api.cloudflare.com/client/v4/accounts/${finalAccountId}/ai/run/${MODEL}`;

    const payload = {
        prompt: prompt,
        width: 1024,
        height: 1024,
        num_inference_steps: 4
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${finalApiToken}`,
            'Content-Type': 'application/json',
            'Connection': 'keep-alive' 
        },
        body: JSON.stringify(payload),
        redirect: 'manual'
    });

    if (response.status !== 200) {
        const errorText = await response.text();
        throw new Error(`Cloudflare API Failed (${response.status}): ${errorText.slice(0, 200)}`);
    }

    const contentType = response.headers.get('content-type') || '';

    // Handle Case A: Raw image stream
    if (contentType.includes('image')) {
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    } 
    
    
    if (contentType.includes('application/json')) {
        const jsonData = await response.json();
        if (jsonData.result && jsonData.result.image) {
            return Buffer.from(jsonData.result.image, 'base64');
        }
    }

    throw new Error("Invalid or missing image payload data in response structure.");
};

module.exports = {
    generateCloudflareImage
};
