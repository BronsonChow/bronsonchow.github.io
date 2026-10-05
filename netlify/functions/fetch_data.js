export const handler = async (event, context) => {
    const spreadsheetID = "1WMIVNClOw7a2aftjfZl0al2rAorJvz1El-ihGO9mogE";
    const range = encodeURIComponent("wh-info!A1:K");
    const apiKey = process.env.generalGoogleSheet;

    if (!apiKey)
    {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "generalGoogleSheet environment variable is not set" }),
        };
    }
    try
    {
        const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetID}/values/${range}?key=${apiKey}`);
        const data = await response.json();

        return {
            statusCode: response.status,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        };
    }
    catch (error)
    {
        return {
            statusCode: 500,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ error: "Failed to fetch data", details: error.message }),
        };
    }
};