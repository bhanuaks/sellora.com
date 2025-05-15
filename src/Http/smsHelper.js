
export async function sendMobileSMS(sender, receiver, message) {
    const apiKey = process.env.BREVO_API_KEY;
  
    if (!apiKey) {
      throw new Error("Brevo API key is missing in environment variables.");
    }
  
    const headers = new Headers({
      "accept": "application/json",
      "api-key": apiKey,
      "content-type": "application/json",
    });
  
    const body = JSON.stringify({
      sender: sender,
      recipient: receiver,
      content: message,
      type: "transactional",
    });
  
    const requestOptions = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };
  
    try {
      const response = await fetch("https://api.brevo.com/v3/transactionalSMS/sms", requestOptions);
      if (!response.ok) {
        const error = await response.text();
        throw new Error(`SMS sending failed with status ${response.status}: ${error}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Error sending SMS:", error);
      throw error;
    }
  }
  