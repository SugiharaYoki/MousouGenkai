const accessToken = "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";
const owner = "SugiharaYoki";
const repo = "MousouGenkai";
const path = "temptest.txt";
const content = "Hello, World!";

fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${path}`, {
  method: "PUT",
  headers: {
    "Authorization": `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: "Add new file",
    content: btoa(unescape(encodeURIComponent(content))),
  }),
})
.then(response => response.json())
.then(data => {
  // Handle the response data
})
.catch(error => {
  // Handle any errors
});
