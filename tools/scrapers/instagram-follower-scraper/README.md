# Instagram Follower Count Scraper

A powerful and focused Apify actor that scrapes follower counts specifically from Instagram profiles. Fast, reliable, and easy to use.

## Features

- 📸 **Instagram Focused**: Specialized for Instagram follower count extraction
- 🔄 **Batch Processing**: Handle multiple Instagram URLs in a single run
- 📊 **Structured Output**: Returns clean, structured data with usernames and follower counts
- ⚡ **Robust Parsing**: Handles various follower count formats (1.2K, 5.5M, 663M, etc.)
- 🚀 **Fast & Reliable**: Optimized specifically for Instagram's structure
- 🎯 **High Success Rate**: Focused approach leads to better reliability

## Input

The actor accepts Instagram profile URLs as input:

```json
{
  "urls": "https://instagram.com/cristiano\nhttps://instagram.com/therock\nhttps://instagram.com/kyliejenner"
}
```

### Parameters

- **urls** (required): Instagram profile URLs, one per line in textarea format

## Output

The actor returns an array of results with the following structure:

```json
[
  {
    "url": "https://instagram.com/cristiano",
    "platform": "instagram",
    "username": "cristiano",
    "followerCount": 663000000,
    "scrapedAt": "2025-01-15T10:30:00.000Z",
    "success": true
  }
]
```

### Output Fields

- **url**: The original Instagram URL that was scraped
- **platform**: Always "instagram"
- **username**: Extracted Instagram username
- **followerCount**: Numeric follower count (null if extraction failed)
- **scrapedAt**: ISO timestamp of when the data was scraped
- **success**: Boolean indicating if the scraping was successful
- **error**: Error message (only present if scraping failed)

## Local Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd follower-count-scraper
```

2. Install dependencies:
```bash
npm install
```

3. Run locally with sample data:
```bash
npm start
```

### Testing

You can test the scraper locally by modifying the `input.json` file with your desired Instagram URLs:

```json
{
  "urls": "https://instagram.com/your_username\nhttps://instagram.com/another_username"
}
```

Then run:
```bash
node main.js
```

## Deployment to Apify

### Prerequisites

- Apify account
- Apify CLI installed globally

### Deploy

1. Login to Apify:
```bash
apify login
```

2. Push the actor:
```bash
apify push
```

3. The actor will be available in your Apify console for scheduling and running.

## Rate Limiting & Best Practices

- The scraper includes built-in 3-second delays between requests to be respectful to Instagram
- Instagram has rate limiting policies, so avoid scraping too many profiles too quickly
- Consider running the scraper during off-peak hours
- Monitor for any Instagram changes that might break selectors
- Works best with public Instagram profiles

## Platform Support

| Platform | Status | Notes |
|----------|--------|-------|
| Instagram | ✅ | Optimized for Instagram follower count extraction |

## Troubleshooting

### Common Issues

1. **Selector not found**: Instagram frequently updates their HTML structure. Check for updated selectors in the Instagram scraping function.

2. **Rate limiting**: If you get blocked by Instagram, reduce the number of URLs or increase the delay between requests.

3. **Login required**: Some Instagram profiles may require login. The scraper works best with public profiles.

4. **Private profiles**: The scraper cannot access follower counts from private Instagram profiles.

### Debugging

Enable debug mode by setting the environment variable:
```bash
APIFY_LOG_LEVEL=DEBUG node main.js
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Apache-2.0 License

## Disclaimer

This Instagram scraper is for educational and research purposes. Please ensure you comply with Instagram's terms of service and applicable laws regarding data scraping. Use responsibly and respect Instagram's rate limits.
