# Crux AI Tools & Utilities

This directory contains tools and utilities used by the Crux AI platform.

## Scrapers

### Instagram Follower Scraper

Located in `scrapers/instagram-follower-scraper/`

- **Purpose**: Scrapes follower counts from Instagram profiles
- **Platform**: Deployed as Apify Actor
- **Usage**: Used by the backend API for social media analytics
- **Actor ID**: `DNAdjmmIXMpBcJ9Ud` (deployed on Apify platform)

#### Features:
- Batch processing of multiple Instagram URLs
- Rate limiting (3-second delays between requests)
- Handles various follower count formats (1.2K, 5.5M, etc.)
- Returns structured JSON with usernames and follower counts

#### Integration:
The scraper is integrated into the main backend via `backend/followerScraper.js` which calls the deployed Apify actor.

