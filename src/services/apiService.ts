export const chatWithPortfolio = async (message: string, history: any[]) => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, history }),
    });
    const data = await response.json();
    return data.text || data.error;
  } catch (error) {
    console.error("Chat API Error:", error);
    return "Communication breakdown.";
  }
};

export const generateBlogPost = async (topic: string) => {
  try {
    const response = await fetch('/api/blog', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic }),
    });
    const data = await response.json();
    return data.text || data.error;
  } catch (error) {
    console.error("Blog API Error:", error);
    return "Generation failed.";
  }
};
