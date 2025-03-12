// Replace with your actual API key
const apiKey = 'sk-proj-xxx';


// Real-world scenario prompt for backlink opportunities
const prompt = 'List relevant, authoritative websites for backlinks based on this content:';

// Safe content extraction
let content = document.querySelector('article') ? document.querySelector('article').innerText : document.body.innerText;

const requestData = {
  model: 'gpt-4o',
  tools: [{ type: 'web_search_preview', search_context_size: 'medium' }],
  input: `${prompt}\n\n${content}`
};

const xhr = new XMLHttpRequest();
xhr.open('POST', 'https://api.openai.com/v1/responses', false); // synchronous request
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.setRequestHeader('Authorization', `Bearer ${apiKey}`);

try {
  xhr.send(JSON.stringify(requestData));

  if (xhr.status === 200) {
    const json = JSON.parse(xhr.responseText);
    if(json.output && json.output[0] && json.output[0].content && json.output[0].content[0] && json.output[0].content[0].text){
      return seoSpider.data(json.output[0].content[0].text);
    } else {
      return seoSpider.error('Unexpected response format: ' + xhr.responseText);
    }
  } else {
    return seoSpider.error(`HTTP Error: ${xhr.status}`);
  }
} catch (error) {
  return seoSpider.error(error.toString());
}
