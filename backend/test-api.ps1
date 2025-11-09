$headers = @{
    'Content-Type' = 'application/json'
}

$body = @{
    message = "What is 2+2?"
    apiKey = "AIzaSyA_test_key_here"
    provider = "gemini"
} | ConvertTo-Json

$response = Invoke-RestMethod -Uri "http://localhost:5000/api/chat" -Method Post -Headers $headers -Body $body -ErrorAction SilentlyContinue

$response
