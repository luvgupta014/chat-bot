$headers = @{
    'Content-Type' = 'application/json'
}

# Replace with your actual Gemini API key
$geminiApiKey = Read-Host "Enter your Gemini API key"

$body = @{
    message = "What is 2+2?"
    apiKey = $geminiApiKey
    provider = "gemini"
} | ConvertTo-Json

Write-Host "Testing chat endpoint with Gemini..."
Write-Host "API Key: $($geminiApiKey.Substring(0, 10))..."

try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/chat" -Method Post -Headers $headers -Body $body -ErrorAction Stop
    Write-Host "✅ Success!" -ForegroundColor Green
    Write-Host "Response:" -ForegroundColor Cyan
    Write-Host $response
} catch {
    Write-Host "❌ Error:" -ForegroundColor Red
    Write-Host $_.Exception.Message
}
