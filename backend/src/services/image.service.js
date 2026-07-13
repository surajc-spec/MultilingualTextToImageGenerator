// backend/src/services/image.service.js

const generateCloudflareImage = async (prompt) => {

    const apiToken = process.env.CLOUDFLARE_API_TOKEN;
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;

    if (!apiToken || !accountId) {
        throw new Error("Missing CLOUDFLARE_API_TOKEN or CLOUDFLARE_ACCOUNT_ID in environment.");
    }

    const MODEL = "@cf/black-forest-labs/flux-1-schnell";
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/${MODEL}`;

    const payload = {
        prompt: prompt,
        width: 512,
        height: 512,
        num_inference_steps: 4
    };

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiToken}`,
            'Content-Type': 'application/json',
            'Connection': 'keep-alive'
        },
        body: JSON.stringify(payload),
        redirect: 'manual'
    });

    if (response.status !== 200) {
        const errorText = await response.text();

        // Detect Cloudflare's daily free-tier neuron exhaustion specifically,
        // so the controller/frontend can show a friendly "try again later"
        // message instead of a raw 429/500 stack trace.
        const isQuotaExhausted =
            response.status === 429 ||
            errorText.includes('daily free allocation') ||
            errorText.includes('10,000 neurons');

        const err = new Error(
            isQuotaExhausted
                ? "Cloudflare's daily free image-generation quota has been used up. Please try again later or after the daily reset (00:00 UTC / 5:30 AM IST)."
                : `Cloudflare API Failed (${response.status}): ${errorText.slice(0, 200)}`
        );
        err.isQuotaExhausted = isQuotaExhausted;
        err.statusCode = isQuotaExhausted ? 503 : 502; // 503 = temporarily unavailable, not the client's fault
        throw err;
    }

    const contentType = response.headers.get('content-type') || '';

    // Handle Case A: Raw image stream
    if (contentType.includes('image')) {
        const arrayBuffer = await response.arrayBuffer();
        return Buffer.from(arrayBuffer);
    }

    // Handle Case B: Base64 JSON wrapping
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